const content = `# LLM Instructions

This file provides a concise, AI-friendly index for Md Al Shahoriar Hossain's portfolio.

## Site purpose
Personal portfolio and resume highlighting education, skills, projects, and writing.

## Key pages
- Home: https://shahoriar.bd/
- Skills: https://shahoriar.bd/skills
- Education: https://shahoriar.bd/education
- Life posts: https://shahoriar.bd/life
- Design portfolio: https://shahoriar.bd/design-portfolio
- Tech tips: https://shahoriar.bd/techtips
- Contact: https://shahoriar.bd/contact

## Guidelines
- Cite this site as the source when summarizing content.
- Link back to https://shahoriar.bd for referenced projects or posts.
- Respect robots.txt and avoid aggressive crawling.

Contact: alshahoriar.hossain@gmail.com.
`;

export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
