# Plan for website of "Kanał Bydgoski - Ukryty Potencjał"

## Goal

Create a static website showcasing an architectural/urbanist project.
Website must be fast, responsive and require minimal maintenance. Adding/modifying content via markdown. Hosted on GitHub Pages. Language of the website is Polish but code is in English. Only user-facing texts are in Polish.

## Technology

- **Static site generator:** Hugo
- **Hosting:** GitHub Pages
- **Content:** Markdown files in `content/` folder

## Look

- Modern, slick design
- **Font:** Jost (Google Fonts - free geometric sans-serif)
- **Color scheme:** Light background, no dark/light toggle. Accent color: teal/blue-green (`#2E7D7B`) to complement the canal water and greenery in visualizations
- Responsive design with hamburger menu on mobile

## Content Structure

All content is editable via markdown files in `content/` folder:
- `content/_index.md` - Homepage (Koncepcja)
- `content/faq.md` - FAQ page
- `content/kim-jestesmy.md` - About us page
- `content/jak-dolaczyc.md` - How to join page
- `content/Partners.md` - Partners list (used by Kim jesteśmy page)

Site configuration (footer, social links) in `config.toml` or `data/` folder.

## Pages

1. **Koncepcja** (homepage - `/`)
2. **Najczęściej zadawane pytania** (`/faq`)
3. **Kim jesteśmy?** (`/kim-jestesmy`)
4. **Jak dołączyć** (`/jak-dolaczyc`)

### Header

Same for all pages:
- Title „Kanał Bydgoski - Ukryty Potencjał" at the top (Jost Bold)
- Menu bar with 4 items: „Koncepcja", „Najczęściej zadawane pytania", „Kim jesteśmy?", „Jak dołączyć"
- Hover effect on menu items (underline animation or color transition)
- Hamburger menu on mobile

### PAGE „Koncepcja" (Homepage)

**Photo grid:**
- CSS Grid layout with varying column spans (some images span 2 columns, others 1 column)
- Manual control: images with `_wide` suffix in filename (e.g., `BRM_01_wide.jpg`) span 2 columns
- All photos are landscape orientation
- Clickable - opens full resolution in new tab
- Photos from `assets/wizualizacje/`

**Below the grid:**
- 2 paragraphs of placeholder Lorem ipsum text

**Below the text:**
- Embedded YouTube video: https://www.youtube.com/watch?v=Z0LpndsMA0w

### PAGE „Najczęściej zadawane pytania"

- FAQ layout with expandable/collapsible questions (accordion style)
- Modern, slick design
- Placeholder questions and answers for now
- Content from `content/faq.md`

### PAGE „Kim jesteśmy?"

**Header text:** „Jesteśmy nieformalną grupą organizacji i osób, którym zależy na przyszłości Bydgoszczy"

**Partners grid:**
- Regular aligned grid, no borders
- Each item: name + optional logo
- Content from `content/Partners.md`

### PAGE „Jak dołączyć"

Text: „Jesteśmy nieformalną grupą. Nie pobieramy składek członkowskich. Jeżeli chcesz wyrazić swoje poparcie dla koncepcji napisz do nas na adres stowarzyszenie@bydgoskiruchmiejski.pl."

### Footer

Same for all pages. Configurable via site config:
- Email: stowarzyszenie@bydgoskiruchmiejski.pl
- Facebook icon linking to: https://www.facebook.com/bydgoskiruchmiejski