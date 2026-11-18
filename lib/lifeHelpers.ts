import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS, type Document, type Node } from '@contentful/rich-text-types';

export interface ContentfulImageFile {
  url: string;
  details?: {
    image?: {
      width: number;
      height: number;
    };
  };
}

export interface ContentfulImage {
  fields: {
    file?: ContentfulImageFile;
    title?: string;
    description?: string;
  };
}

export interface LifeEventFields {
  title: string;
  date: string;
  slug: string;
  content: Document;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: ContentfulImage;
  // Optional future Contentful fields (supported immediately with graceful fallbacks)
  category?: string;
  tags?: string[];
  keyTakeaways?: string[] | string;
  tldr?: string;
  relatedProject?: string;
  externalUrl?: string;
}

export interface LifeEvent {
  sys: {
    updatedAt: string;
  };
  fields: LifeEventFields;
}

/**
 * Normalizes LinkedIn Mathematical Bold Unicode characters (NFKC),
 * strips leading decorative emojis, and replaces em/en dashes with colons or commas.
 */
export function cleanTitle(raw: string): string {
  if (!raw) return '';
  return raw
    .normalize('NFKC')
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/gu, '')
    .replace(/\s*[—–]\s*/g, ': ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeProseText(raw: string): string {
  if (!raw) return '';
  return raw
    .normalize('NFKC')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function toIsoDateTime(dateStr: string): string {
  if (!dateStr) return dateStr;
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())
    ? `${dateStr.trim()}T00:00:00+06:00`
    : dateStr;
}

/**
 * Extracts plain text from a Contentful RichText Document while preserving spaces between block nodes.
 */
export function richTextToSpacedPlainText(doc?: Document): string {
  if (!doc || !Array.isArray(doc.content)) return '';
  return documentToPlainTextString(doc, ' ')
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncateAtWord(text: string, maxLength = 200): string {
  const normalized = normalizeProseText(text);
  if (normalized.length <= maxLength) return normalized;
  const sliced = normalized.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced).trimEnd()}…`;
}

export function getSmartExcerpt(fields: LifeEventFields, maxLength = 220): string {
  if (fields.excerpt?.trim()) {
    return truncateAtWord(fields.excerpt, maxLength);
  }
  if (fields.seoDescription?.trim()) {
    return truncateAtWord(fields.seoDescription, maxLength);
  }
  return truncateAtWord(richTextToSpacedPlainText(fields.content), maxLength);
}

const PLACEHOLDER_ALT_PATTERNS = [
  /^contentful post$/i,
  /\.(mp4|jpg|jpeg|png|webp|gif|mov)/i,
  /^[a-z0-9-]+$/i, // bare slug like "bifs-2025" or "portfolio-story"
];

export function getCleanImageAlt(
  coverImage: ContentfulImage | undefined,
  fallbackPostTitle: string
): { alt: string; caption?: string } {
  const cleanedPostTitle = cleanTitle(fallbackPostTitle);
  const rawDesc = coverImage?.fields?.description?.trim();
  const rawTitle = coverImage?.fields?.title?.trim();

  if (rawDesc && !PLACEHOLDER_ALT_PATTERNS.some((re) => re.test(rawDesc))) {
    const cleanDesc = normalizeProseText(rawDesc);
    return { alt: cleanDesc, caption: cleanDesc };
  }

  if (rawTitle && !PLACEHOLDER_ALT_PATTERNS.some((re) => re.test(rawTitle))) {
    const cleanedAssetTitle = cleanTitle(rawTitle);
    const isSameAsTitle =
      cleanedAssetTitle.toLowerCase() === cleanedPostTitle.toLowerCase();
    return {
      alt: cleanedAssetTitle,
      caption:
        !isSameAsTitle && cleanedAssetTitle.split(/\s+/).length >= 4
          ? cleanedAssetTitle
          : undefined,
    };
  }

  return { alt: cleanedPostTitle, caption: undefined };
}

/**
 * Inspects all heading blocks in a Contentful RichText Document and maps them
 * sequentially to h2, h3, h4 so no heading level is ever skipped under the page h1.
 */
export function buildNormalizedHeadingMap(
  doc?: Document
): Record<string, 'h2' | 'h3' | 'h4'> {
  const headingOrder = [
    BLOCKS.HEADING_1,
    BLOCKS.HEADING_2,
    BLOCKS.HEADING_3,
    BLOCKS.HEADING_4,
    BLOCKS.HEADING_5,
    BLOCKS.HEADING_6,
  ];
  const presentTypes = new Set<string>();

  function walk(nodes?: Node[]) {
    if (!Array.isArray(nodes)) return;
    for (const node of nodes) {
      if (headingOrder.includes(node.nodeType as BLOCKS)) {
        presentTypes.add(node.nodeType);
      }
      if ('content' in node && Array.isArray((node as Document).content)) {
        walk((node as Document).content);
      }
    }
  }

  walk(doc?.content);

  const sortedPresent = headingOrder.filter((t) => presentTypes.has(t));
  const targetTags: ('h2' | 'h3' | 'h4')[] = ['h2', 'h3', 'h4'];
  const map: Record<string, 'h2' | 'h3' | 'h4'> = {};

  sortedPresent.forEach((nodeType, index) => {
    map[nodeType] = targetTags[Math.min(index, targetTags.length - 1)];
  });

  // Fallback for any heading type not encountered during top-level walk
  headingOrder.forEach((nodeType, index) => {
    if (!map[nodeType]) {
      map[nodeType] = targetTags[Math.min(index, targetTags.length - 1)];
    }
  });

  return map;
}

export interface InferredPostMeta {
  category: string;
  tags: string[];
  relatedProject?: {
    name: string;
    href: string;
    description: string;
  };
}

export function inferPostMeta(fields: LifeEventFields): InferredPostMeta {
  const slug = fields.slug.toLowerCase();
  const title = cleanTitle(fields.title).toLowerCase();
  const combined = `${slug} ${title}`;

  let category = fields.category?.trim() || 'Career and Reflections';
  const tags = new Set<string>(fields.tags || []);

  if (
    /excelerate|capitalizer|accfinity|accolyze|technopreneurship|devthon|iscea|ideainnovation|bhorosha|finalist|hackathon/.test(
      combined
    )
  ) {
    category = fields.category?.trim() || 'Case Competitions';
    tags.add('Business Competitions');
    tags.add('Financial Modeling');
  } else if (/ey-bangladesh|bkash|banglalink|famp|bifs|bicm|orangecorner/.test(combined)) {
    category = fields.category?.trim() || 'Audit and Finance Career';
    tags.add('Finance and Assurance');
  } else if (/immich|portfolio|power-bi|skilldash/.test(combined)) {
    category = fields.category?.trim() || 'Engineering and Systems';
    tags.add('Software Engineering');
  }

  if (combined.includes('ey')) tags.add('EY Bangladesh');
  if (combined.includes('bkash')) tags.add('bKash');
  if (combined.includes('immich')) tags.add('Self-Hosting');
  if (combined.includes('power-bi') || combined.includes('excelerate')) tags.add('Power BI');
  if (combined.includes('cfi') || combined.includes('famp')) tags.add('Corporate Finance Institute');

  let relatedProject: InferredPostMeta['relatedProject'];

  if (fields.relatedProject?.trim()) {
    relatedProject = {
      name: 'Featured Project',
      href: fields.relatedProject.trim(),
      description: 'Explore the software project connected to this article.',
    };
  } else if (slug.includes('immich') || slug.includes('portfolio')) {
    relatedProject = {
      name: 'TapFeed: Windows Tapo Camera Viewer',
      href: '/projects/tapfeed',
      description:
        'Open-source Rust and Tauri 2 Windows desktop app for local TP-Link Tapo camera live streams and microSD recording downloads.',
    };
  } else if (slug.includes('ey') || slug.includes('bkash') || slug.includes('famp')) {
    relatedProject = {
      name: 'Bangladesh Youth Tax Calculator Skill',
      href: '/projects/youth-tax-calculator',
      description:
        'AI Agent Skill and deterministic statutory Python engine for filing on etaxnbr.gov.bd under the Income Tax Act 2023.',
    };
  }

  return {
    category,
    tags: Array.from(tags),
    relatedProject,
  };
}
