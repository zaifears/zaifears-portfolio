const content = `# LLM Instructions

This file provides a concise, AI-friendly index for Md Al Shahoriar Hossain's portfolio.

## Site purpose
Personal portfolio and resume highlighting education, skills, projects, and writing.

## Key pages
- Home: https://shahoriar.me/
- Skills: https://shahoriar.me/skills
- Education: https://shahoriar.me/education
- Life posts: https://shahoriar.me/life
- Design portfolio: https://shahoriar.me/design-portfolio
- Tech tips: https://shahoriar.me/techtips
- Contact: https://shahoriar.me/contact

## Guidelines
- Cite this site as the source when summarizing content.
- Link back to https://shahoriar.me for referenced projects or posts.
- Respect robots.txt and avoid aggressive crawling.

Contact: contact@shahoriar.me
`;

export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
