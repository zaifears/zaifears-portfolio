/**
 * Lightweight Vercel KV / Upstash Redis REST client (zero external dependencies).
 * Uses `KV_REST_API_URL` and `KV_REST_API_TOKEN` from the environment.
 */

export type RedisArg = string | number;
export type RedisCommand = [string, ...RedisArg[]];

function getKvConfig(): { url: string; token: string } | null {
  const url = (
    process.env.ANALYTICS_KV_REST_API_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL
  )?.replace(/\/+$/, '');
  const token =
    process.env.ANALYTICS_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

export function isKvConfigured(): boolean {
  return getKvConfig() !== null;
}

/**
 * Execute a single Redis command via Upstash/Vercel KV REST API.
 */
export async function kvCommand<T = unknown>(command: RedisCommand): Promise<T | null> {
  const cfg = getKvConfig();
  if (!cfg) return null;

  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`KV command ${command[0]} failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const json = (await res.json()) as { result?: T; error?: string };
  if (json.error) {
    throw new Error(`KV command ${command[0]} error: ${json.error}`);
  }
  return (json.result ?? null) as T | null;
}

/**
 * Execute a batch of Redis commands in a single HTTP round trip using `/pipeline`.
 */
export async function kvPipeline<T = unknown>(commands: RedisCommand[]): Promise<T[]> {
  if (commands.length === 0) return [];
  const cfg = getKvConfig();
  if (!cfg) return commands.map(() => null as T);

  const res = await fetch(`${cfg.url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`KV pipeline failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const items = (await res.json()) as Array<{ result?: T; error?: string }>;
  return items.map((item) => (item?.error ? (null as T) : ((item?.result ?? null) as T)));
}

/**
 * Normalize a Redis HGETALL response (Upstash REST returns either a flat
 * `[field, val, field, val, ...]` array or a plain object depending on client/version)
 * into a `Record<string, string>`.
 */
export function parseHashResult(raw: unknown): Record<string, string> {
  if (!raw) return {};
  if (Array.isArray(raw)) {
    const out: Record<string, string> = {};
    for (let i = 0; i < raw.length - 1; i += 2) {
      const k = String(raw[i]);
      const v = String(raw[i + 1] ?? '');
      out[k] = v;
    }
    return out;
  }
  if (typeof raw === 'object') {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (v !== undefined && v !== null) out[k] = String(v);
    }
    return out;
  }
  return {};
}
