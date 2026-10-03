# AI Search Readiness & Agentic SEO Audit: shahoriar.bd

## Status Summary
- **Category Score:** 86 / 100
- **Agent Tree Score:** 100 / 100 (`agent_ux_check.py`)
- **Key Flaw:** `llms.txt` fails standard format and Lighthouse Agentic checks

---

## 1. Automated Audit Findings (`agentic_check.py` & `agent_ux_check.py`)
- **Accessibility Tree for Agents:** **100 / 100**
  - Total accessibility nodes: 369
  - Interactive nodes: 29 (all cleanly mapped to real `<button>` or `<a>` elements)
  - `div-onclick` widgets: 0
  - Semantic landmarks: 12
  - Unnamed interactive elements: 0
- **AI Crawler Directives:**
  - `robots.txt` explicitly allows `GPTBot`, `Claude-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Applebot-Extended`, and `CCBot`.
- **HTTP Discovery Header:**
  - `Link: </llms.txt>; rel="llms-txt", </llms-full.txt>; rel="llms-full-txt"` is emitted on every response.
  - Redirect from `/llm.txt` to `/llms.txt` is active.

---

## 2. Identified Deficiencies

### Issue 1: `llms.txt` Syntax Standard Failure
- **Evidence:** `agentic_check.py` flagged `llms.txt` as failing Lighthouse Agentic criteria:
  - Error: *"contains no Markdown links"*
  - Note: *"no blockquote summary ('> ...') as llmstxt.org recommends"*
- **Root Cause:** In [app/llms.txt/route.ts](file:///a:/zaifears-portfolio/app/llms.txt/route.ts), links are listed as plain text with bare URLs:
  `- Professional profile: https://shahoriar.bd/ai`
  rather than Markdown format:
  `- [Professional Profile](https://shahoriar.bd/ai): Comprehensive, machine-readable overview...`
  Also, the document lacks the mandatory blockquote summary right below the H1 title.
- **Fix:** Update `app/llms.txt/route.ts` with compliant syntax according to `llmstxt.org`.

### Issue 2: Discovery Catalog (`ai-catalog.json`)
- Optional discovery catalog at `/.well-known/ai-catalog.json` returned 404. For a personal portfolio, this is marked N/A, but if MCP tools or agent skills are offered, an `ai-catalog.json` can be exposed.
