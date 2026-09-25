# VV Studio Website — Blog Details, Carousel, FAQ & Testimonial Implementation Prompt

> Copy-paste this entire file as your instruction to the coding agent working in the **VV Studio project**.
> The same work is already completed and verified on the Capital website — replicate the **functionality, APIs, and behavior** below. Adapt file paths/component names to the VV codebase where they differ, but keep the logic identical.

---

## 0. Scope (read first)

- Work **ONLY on the VV Studio project**. Do not touch any other project.
- Before writing any code, **inspect** the VV codebase: blog listing page, blog details page, blog components, existing carousel components, FAQ component/section, testimonial/review components, API service functions and hooks, response types/interfaces, page params (slugs), and existing conditional rendering.
- **Reuse** existing VV components, API methods, hooks, styling tokens, and design patterns. Do not create duplicate API logic if an existing service/hook can be reused.
- **Do NOT hardcode**: blog data, FAQ data, testimonials, headings/titles (except the two fixed titles named below), API IDs, or page-specific content. Everything must be API + slug-param driven.
- If FAQ or testimonial data is missing/null/empty for a slug, the section must **gracefully render nothing** — never broken UI.

---

## 1. Blog Details Carousel + Other Blogs Carousel

On the **Blog Details page**, add **two** carousel sections using the **existing blog card design** (image, category badge, date, title, excerpt, "Read Article" link). Keep spacing, typography, buttons, and responsive behavior consistent with the site.

### Carousel 1 — Featured / relevant blogs
- Data source (in order): `GET /getFeaturedBlogs` → fallback to the `featured` array embedded in `GET /getBlogsBySlug/{slug}`.
- **Exclude the currently opened blog** (match by `blog_slug`, fallback `id`).

### Carousel 2 — Other Blogs (placed AFTER carousel 1)
- Data source (in order): `GET /getFrontBlogs` → fallback to `GET /getBlogs`.
- Dedupe by slug; **exclude the current blog AND every blog already shown in Carousel 1**.
- Same card design, same carousel behavior as Carousel 1.

### Carousel behavior (both carousels, and homepage if applicable)
- Responsive visible cards: **1 on mobile, 2 on tablet, 3 on desktop** (e.g. `w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`, snap-start cards in a snap-x scroll track).
- Prev/Next arrow buttons (disabled state at the ends), dot indicators + `01 / 0N` counter.
- Auto-play every ~5s, loops back to start, **pauses on hover/touch**.
- Native swipe via `overflow-x-auto`; hide scrollbar; `aria-roledescription="carousel"` / `slide` for accessibility.
- States: **loading → skeleton cards**; **empty/error → section hidden** (no broken UI).
- When the underlying list changes (e.g. navigating between blog slugs), reset scroll to start. (Implementation note: do NOT call `setState` synchronously inside `useEffect` — derive the index from scroll position instead, or the `react-hooks/set-state-in-effect` lint rule will fail.)
- Do not break existing blog functionality (detail content, prev/next article nav must keep working).

---

## 2. Blog FAQ (slug-driven with fallback + heading groups)

### Data flow (verify each step against the real API)
```
GET /getBlogsBySlug/{slug}  →  `faq` array
        + GET /getFAQBySlug/{slug}
        + GET /getFAQBySlug/blogs   (shared fallback)
    ↓ service layer (parse `body.faq` / `body.data` as arrays, no key renames)
    ↓ props (detail response `faq` passed as direct `items`)
    ↓ reusable FAQ section component
    ↓ display on page
```

### Reusable FAQ section requirements
- Props: `slug?`, `fallbackSlug?`, `items?` (direct rows, win when non-empty), `title?`, `eyebrow?` (default `"STILL HAVE QUESTIONS?"`).
- Resolution order: direct `items` → `GET /getFAQBySlug/{slug}` → `GET /getFAQBySlug/{fallbackSlug}` (skip the fallback fetch when it equals `slug`).
- Item field mapping (all keys optional in types — support every variant):
  - question ← `question` ?? `faq_que` ?? `faq_question`
  - answer ← `answer` ?? `faq_ans` ?? `faq_answer`
  - heading ← `faq_heading` (trimmed, nullable)
  - sort ← numeric `faq_sort` (string `"1"` must parse to `1`)
- Drop rows with empty question or answer; sort ascending by `faq_sort`; render nothing when the final list is empty.
- **Fixed section title on blog pages:** pass `title="Blog FAQ"` on BOTH the blog listing page (`slug="blogs"`) and the blog details page. (Other pages keep their own titles / API-driven default of first `faq_heading`.)
- **Heading groups:** every distinct API `faq_heading` renders as a sub-heading label above its related Q&A, except when it duplicates the section title, and repeated consecutive headings show the label only once. Net effect: first heading + its Q&A, then second heading + its Q&A inside it, etc.
- Accordion open/close with a single open index; **reset open state when the slug changes** (use render-phase slug comparison, not `setState` in `useEffect`, to satisfy lint).
- Real API shapes you must handle (verified live — do not "fix" the API, handle these keys):
  ```json
  // GET /getFAQBySlug/{slug}
  { "data": [
      { "faq_sort": "1", "faq_heading": "Test1", "faq_que": "Q1", "faq_ans": "A1" },
      { "faq_sort": "2", "faq_heading": null,    "faq_que": "Q2", "faq_ans": "A2" },
      { "faq_sort": "3", "faq_heading": "T2",    "faq_que": "Q1", "faq_ans": "A1" }
  ] }
  // GET /getBlogsBySlug/{slug} embeds the same rows under a `faq` key
  // GET /getFAQBySlug/blogs uses headings "Blog FAQ", null, "Blog OTHER FAQ"
  ```

---

## 3. Testimonials (slug-driven infinite loop — REUSE, don't rebuild)

- There is already an **infinite-loop testimonial/review marquee** in the codebase (two identical animated tracks, width-measured duration ≈ `width / 140px per second`, pause on hover, edge fades). **Reuse that component** — do not build a new carousel.
- If the existing marquee is hardcoded for dark backgrounds, extend it with **additive, default-preserving props only** (defaults must keep current pages pixel-identical):
  - `tone?: 'dark' | 'light'` (default `'dark'`) — light tone adapts edge fades + header text for light sections.
  - `hideHeader?: boolean` (default `false`) — lets the parent render its own eyebrow/title.
- Build a reusable slug-driven `TestimonialSection` (mirror the FAQ section's param pattern):
  - Props: `slug?`, `fallbackSlug?`, `items?`, `title?` (default `"What Our Customers Say"`), `eyebrow?` (default `"CLIENT STORIES"`).
  - Resolution order: direct `items` → `GET /getTestimonial/{slug}` → `GET /getTestimonial/{fallbackSlug}`.
  - Usability filter (same rule as schema/homepage): keep rows with **non-empty client name AND non-empty description** (strip HTML before checking); render nothing when empty.
  - Mapping: name ← `testimonial_client_name`, detail ← `testimonial_description`, rating ← numeric `testimonial_rating` clamped 1–5 (default 5), footer ← `"Verified Client · 25 SEP 2026"` from `testimonial_created_date` (`YYYY-MM-DD` → `DD MON YYYY`, no timezone tricks).
  - Feed rows into the reused infinite marquee in **light tone with hidden header**; cycle rows to fill a minimum strip (e.g. 8 cards) so the loop stays seamless even with 1 backend row.
- Wire it up:
  - Blog listing page → `<TestimonialSection slug="blogs" />`
  - Blog details page → `<TestimonialSection slug={blogSlug} fallbackSlug="blogs" />`
- Verified live shape to handle:
  ```json
  // GET /getTestimonial/blogs
  { "data": [{ "testimonial_for": "blogs", "testimonial_client_name": "test",
      "testimonial_description": "test description",
      "testimonial_created_date": "2026-09-25", "testimonial_rating": "5" }] }
  // GET /getTestimonial/{unknown-slug} → { "data": [] } (section hides)
  ```

---

## 4. Full-width placement (important layout rule)

- Testimonial + FAQ sections must render as **full-width top-level page siblings** (own `<section>` + site `Container` inside), **never nested inside the article/content container** — nesting double-constrains padding and squeezes carousels/bands.
- Reference band: FAQ eyebrow `STILL HAVE QUESTIONS?` + `Blog FAQ` title + gold underline, full band width with standard site container padding.
- For the testimonial loop: header grid-aligned in the container, marquee track **full-bleed edge-to-edge** below it (same as the homepage loop).
- On the details page, the detail query needed for direct FAQ `items` must reuse the **same React Query key** as the article component (cached — no extra network request).

---

## 5. Verification checklist (must all pass)

### Blog details page
- [ ] Article content + heading load correctly; prev/next article nav works.
- [ ] Featured carousel displays (same card design); current blog never appears in it.
- [ ] Other Blogs carousel displays after it (hidden gracefully if no remaining blogs).
- [ ] `Blog FAQ` title fixed; Q&A displayed; second API heading (`T2`-style) shows with its related Q&A grouped under it.
- [ ] Testimonials infinite loop displays when slug/fallback data exists; hidden when both empty.
- [ ] Desktop + tablet + mobile layouts correct; full-width bands, no squeezed sections.
- [ ] No console errors, no API errors, lint clean, production build passes.

### Data-behavior matrix (test both)
- [ ] Data exists → section displays.
- [ ] No data (null/empty) → section hidden, no broken UI.

---

## 6. Final report (reply with this exact structure)

1. What caused the FAQ issue (trace API → service → props → component).
2. What caused the testimonial issue (API response, params, mapping, conditional render?).
3. What caused the heading issue, if any.
4. What was changed.
5. Which components/API functions were reused.
6. Which files were modified.
7. How the Blog Details page was verified (build, lint, rendered HTML checks).
8. Confirmation that the VV work is completed and working.

Do not perform unrelated refactoring or UI redesigns. VV project only.
