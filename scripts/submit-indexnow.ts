import {
  buildIndexNowPayload,
  getIndexNowHost,
  getIndexNowKey,
  getKeyLocation,
  submitToIndexNow,
} from '../lib/indexnow';

async function main() {
  console.log('🚀 IndexNow URL Submission Starting...');

  const host = getIndexNowHost();
  const key = getIndexNowKey();
  const keyLocation = getKeyLocation(key, host);

  console.log(`📌 Host: ${host}`);
  console.log(`🔑 Key: ${key}`);
  console.log(`📄 Key Location: ${keyLocation}\n`);

  // Canonical indexable routes for shahoriar.bd
  const canonicalRoutes = [
    '/',
    '/ai',
    '/projects',
    '/projects/tapo-viewer',
    '/projects/youth-tax-calculator',
    '/projects/locreminder',
    '/projects/locreminder/policy',
    '/skills',
    '/education',
    '/contact',
    '/life',
    '/techtips',
    '/design-portfolio',
    '/thanks',
  ];

  // Try to load dynamic Contentful blog posts if keys are configured
  let additionalRoutes: string[] = [];
  try {
    if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
      const { getContentfulEntries } = await import('../lib/contentfulClient');
      const response = await getContentfulEntries({
        content_type: 'zaifearsBlogPost',
      });
      if (response && Array.isArray(response.items)) {
        additionalRoutes = response.items.map(
          (item: any) => `/life/${item.fields.slug}`
        );
        console.log(`📝 Loaded ${additionalRoutes.length} dynamic blog posts from Contentful.`);
      }
    }
  } catch (err) {
    console.warn('⚠️ Contentful fetch skipped or failed:', (err as Error).message);
  }

  const allRoutes = [...canonicalRoutes, ...additionalRoutes];
  const payload = buildIndexNowPayload(allRoutes, key, host);

  console.log(`📦 Prepared ${payload.urlList.length} unique indexable URLs:`);
  payload.urlList.forEach((url) => console.log(`   - ${url}`));

  console.log('\n📡 Submitting to IndexNow API...');
  const result = await submitToIndexNow(payload.urlList, { key, host });

  if (result.ok) {
    console.log(`\n✅ Success (${result.status})!`);
    console.log(`💬 Message: ${result.message}`);
    console.log(`🌐 Search engines notified: Microsoft Bing, Yandex, Seznam, Naver.`);
  } else {
    console.error(`\n❌ Submission failed (${result.status}):`);
    console.error(`💬 ${result.message}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Fatal error during IndexNow submission:', err);
  process.exit(1);
});
