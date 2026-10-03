import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_INDEXNOW_KEY,
  DEFAULT_INDEXNOW_HOST,
  getIndexNowKey,
  getIndexNowHost,
  getKeyLocation,
  isPathDisallowed,
  normalizeUrl,
  filterIndexableUrls,
  buildIndexNowPayload,
} from '../lib/indexnow';

test('returns default IndexNow key and host when env vars are unset', () => {
  const originalKey = process.env.INDEXNOW_KEY;
  const originalHost = process.env.INDEXNOW_HOST;
  delete process.env.INDEXNOW_KEY;
  delete process.env.INDEXNOW_HOST;

  try {
    assert.equal(getIndexNowKey(), DEFAULT_INDEXNOW_KEY);
    assert.equal(getIndexNowHost(), DEFAULT_INDEXNOW_HOST);
    assert.equal(
      getKeyLocation(),
      `https://${DEFAULT_INDEXNOW_HOST}/${DEFAULT_INDEXNOW_KEY}.txt`
    );
  } finally {
    if (originalKey) process.env.INDEXNOW_KEY = originalKey;
    if (originalHost) process.env.INDEXNOW_HOST = originalHost;
  }
});

test('respects custom key and host passed to getKeyLocation', () => {
  assert.equal(
    getKeyLocation('customkey123', 'example.com'),
    'https://example.com/customkey123.txt'
  );
});

test('correctly identifies disallowed internal routes', () => {
  assert.equal(isPathDisallowed('/zakat-calculation'), true);
  assert.equal(isPathDisallowed('/zakat-report'), true);
  assert.equal(isPathDisallowed('/bride-selector'), true);
  assert.equal(isPathDisallowed('/shoily'), true);
  assert.equal(isPathDisallowed('/bizcomp/accfinity'), true);
  assert.equal(isPathDisallowed('/meetup'), true);

  // Allowed public indexable pages
  assert.equal(isPathDisallowed('/'), false);
  assert.equal(isPathDisallowed('/projects'), false);
  assert.equal(isPathDisallowed('/projects/tapo-viewer'), false);
  assert.equal(isPathDisallowed('/projects/youth-tax-calculator'), false);
  assert.equal(isPathDisallowed('/projects/locreminder'), false);
  assert.equal(isPathDisallowed('/skills'), false);
  assert.equal(isPathDisallowed('/life/my-post'), false);
});

test('normalizes relative paths to full URLs', () => {
  assert.equal(
    normalizeUrl('/projects/tapo-viewer', 'shahoriar.bd'),
    'https://shahoriar.bd/projects/tapo-viewer'
  );
  assert.equal(
    normalizeUrl('projects/tapo-viewer', 'shahoriar.bd'),
    'https://shahoriar.bd/projects/tapo-viewer'
  );
  assert.equal(
    normalizeUrl('https://shahoriar.bd/ai', 'shahoriar.bd'),
    'https://shahoriar.bd/ai'
  );
});

test('filterIndexableUrls deduplicates and excludes disallowed routes and mismatched hosts', () => {
  const input = [
    '/',
    '/projects/tapo-viewer',
    'https://shahoriar.bd/projects/tapo-viewer', // Duplicate
    '/zakat-calculation', // Disallowed
    '/bride-selector', // Disallowed
    'https://spam.com/hack', // External host
    '/skills',
  ];

  const filtered = filterIndexableUrls(input, 'shahoriar.bd');

  assert.deepEqual(filtered, [
    'https://shahoriar.bd/',
    'https://shahoriar.bd/projects/tapo-viewer',
    'https://shahoriar.bd/skills',
  ]);
});

test('buildIndexNowPayload constructs valid IndexNow schema', () => {
  const routes = ['/', '/projects/youth-tax-calculator'];
  const payload = buildIndexNowPayload(routes, 'mykey999', 'shahoriar.bd');

  assert.equal(payload.host, 'shahoriar.bd');
  assert.equal(payload.key, 'mykey999');
  assert.equal(payload.keyLocation, 'https://shahoriar.bd/mykey999.txt');
  assert.deepEqual(payload.urlList, [
    'https://shahoriar.bd/',
    'https://shahoriar.bd/projects/youth-tax-calculator',
  ]);
});
