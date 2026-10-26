import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Regex for full ISO 8601 DateTime (requiring time component and timezone Z or offset)
const ISO_DATETIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

test('app/ai/page.tsx ProfilePage structured data specifies valid ISO 8601 DateTime for dateModified and dateCreated', () => {
  const filePath = path.join(__dirname, '..', 'app', 'ai', 'page.tsx');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract dateModified value
  const dateModifiedMatch = content.match(/dateModified:\s*['"]([^'"]+)['"]/);
  assert.ok(dateModifiedMatch, 'dateModified must be defined in app/ai/page.tsx');
  const dateModified = dateModifiedMatch[1];

  // Must not be a date-only string (e.g. YYYY-MM-DD triggers Google Search Console "Invalid datetime value for 'dateModified'")
  assert.equal(
    /^\d{4}-\d{2}-\d{2}$/.test(dateModified),
    false,
    `dateModified must not be date-only ("${dateModified}") because Google ProfilePage requires ISO 8601 datetime with time`
  );

  // Must match ISO 8601 DateTime
  assert.match(
    dateModified,
    ISO_DATETIME_REGEX,
    `dateModified ("${dateModified}") must match ISO 8601 DateTime format (YYYY-MM-DDTHH:mm:ss+HH:MM or Z)`
  );

  // Must parse as valid Date
  const parsedModified = new Date(dateModified);
  assert.equal(isNaN(parsedModified.getTime()), false, 'dateModified must parse to a valid timestamp');

  // Extract dateCreated value
  const dateCreatedMatch = content.match(/dateCreated:\s*['"]([^'"]+)['"]/);
  assert.ok(dateCreatedMatch, 'dateCreated must be defined in app/ai/page.tsx');
  const dateCreated = dateCreatedMatch[1];

  assert.match(
    dateCreated,
    ISO_DATETIME_REGEX,
    `dateCreated ("${dateCreated}") must match ISO 8601 DateTime format`
  );
  const parsedCreated = new Date(dateCreated);
  assert.equal(isNaN(parsedCreated.getTime()), false, 'dateCreated must parse to a valid timestamp');
});

test('app/ai/page.tsx defines ProfilePage schema with Person mainEntity', () => {
  const filePath = path.join(__dirname, '..', 'app', 'ai', 'page.tsx');
  const content = fs.readFileSync(filePath, 'utf-8');

  assert.ok(content.includes("'@type': 'ProfilePage'"), "Must declare '@type': 'ProfilePage'");
  assert.ok(content.includes("'@type': 'Person'"), "Must declare '@type': 'Person'");
  assert.ok(content.includes("'@id': 'https://shahoriar.bd/#person'"), "Must reference person @id");
  assert.ok(content.includes('name:'), "Must declare name");
  assert.ok(content.includes('sameAs:'), "Must declare sameAs");
});
