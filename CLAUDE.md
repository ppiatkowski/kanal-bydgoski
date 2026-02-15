# Project: Kanał Bydgoski Website

Static website built with Hugo for an architectural/urbanist project about restoring Bydgoszcz Canal.

**Keep this file in sync with the project.** Whenever you make changes that affect project structure, content format, design, or configuration — update this file accordingly.

## Commands

- `hugo server` - Start dev server at http://localhost:1313/
- `hugo` - Build site to `public/` folder

## Project Structure

```
├── config.toml          # Site config (title, menu, footer params)
├── content/
│   ├── _index.md        # Homepage - photo grid config & text
│   ├── transport.md     # Transport page (uses sections layout)
│   ├── konferencja.md   # Conference page - video list
│   ├── faq.md           # FAQ questions (accordion)
│   ├── kim-jestesmy.md  # Partners list
│   └── jak-dolaczyc.md  # Join page (uses sections layout)
├── layouts/
│   ├── index.html       # Homepage template
│   ├── _default/        # Page templates (baseof, single, faq, konferencja, etc.)
│   └── partials/        # Header, footer
└── static/
    ├── css/main.css     # All styles
    ├── js/main.js       # Hamburger menu, FAQ accordion
    ├── wizualizacje/    # Project photos (full resolution)
    │   └── thumbs/      # Thumbnails for grid display (1200px max)
    └── logo/            # Partner logos
```

## Design

- **Font:** Jost (Google Fonts)

## Content Editing

### Homepage rows (`content/_index.md`)

```yaml
rows:
  - images:                         # Image row (up to 3 images)
      - file: "photo1.jpg"
        alt: "Description"          # Alt text (recommended)
      - file: "photo2.jpg"
        wide: true                  # Wide image (2/3 width)
      - file: "photo3.jpg"
  - text: |                         # Text row (full width, markdown)
      ## Section heading
      Description text between image rows.
  - youtube: "VIDEO_ID"             # YouTube video row
  - images:
      - file: "photo4.jpg"
        superwide: true             # Full row width
```

**Row types:**
- `images` - Photo row with up to 3 images per row
- `text` - Full-width markdown content between image rows
- `youtube` - Embedded YouTube video (just the video ID, not full URL)

**Image options:**
- `wide: true` - Image takes 2/3 width, other 2 stack vertically
- `superwide: true` - Image takes full row width
- `alt` - Alt text for accessibility (recommended)

**Grid layout rules:**
- Only 1 wide image per row allowed
- Wide image position (1st, 2nd, 3rd) determines layout
- Order in YAML = order on page

**To add new photos:**
1. Put image file in `static/wizualizacje/`
2. Generate thumbnail: `sips -Z 1200 static/wizualizacje/FILENAME --out static/wizualizacje/thumbs/FILENAME`
3. Add entry to a row's `images:` list

Note: The grid displays thumbnails (from `thumbs/`) for fast loading; clicking opens full-resolution image.

### Partners (`content/kim-jestesmy.md`)

```yaml
partners:
  - name: "Organization Name"
    logo: "logo/filename.png"   # Optional - omit line if no logo
```

**To add new partner:**
1. (Optional) Put logo in `static/logo/`
2. Add entry to `partners:` list

### Conference videos (`content/konferencja.md`)

```yaml
videos:
  - title: "Speaker: Talk title"
    youtubeID: "VIDEO_ID"        # Just the ID, not full URL
    description: |               # Optional - supports markdown
      Description text visible in collapsed and expanded states.
```

### Sections layout (`content/transport.md`, `content/jak-dolaczyc.md`)

Generic layout for content pages with text and optional images. Uses `layout: "sections"`.

```yaml
sections:
  - title: "Section title"          # Optional
    content: |                      # Supports markdown
      Text content for this section.

      - Bullet points work
      - Multiple paragraphs too
    image: "photo.webp"             # Optional - from static/wizualizacje/
    imagePosition: "right"          # Optional - "right" (default) or "left"
    alt: "Image description"        # Alt text for accessibility
```

**Section types:**
- Text only: omit `image` field
- Text + image right: set `imagePosition: "right"` (or omit, it's default)
- Text + image left: set `imagePosition: "left"`

Images are loaded from `static/wizualizacje/` (same as homepage photos).

### FAQ (`content/faq.md`)

```yaml
questions:
  - question: "Question text?"
    answer: "Answer text."
```

### Intro text (`content/_index.md`, `content/konferencja.md`)

```yaml
intro: |
  Your intro paragraph text here. Supports **markdown** formatting.

  - Bullet points
  - Multiple paragraphs (separate with blank line)
```

Displayed at the top of the page. Supports markdown for formatting.

## Site Config (`config.toml`)

- `title` - Header title (displayed at top of all pages)
- `params.description` - Meta description
- `params.email` - Footer email address
- `params.facebookURL` - Footer Facebook link
- `menu.main` - Navigation menu items

## Important Notes

- **Images go in `static/` folder** - the `assets/` folder was removed to avoid duplication
- **Logo paths in kim-jestesmy.md** use relative paths without leading slash: `logo/file.png` (not `/logo/file.png`)
- **After adding/changing images**, Hugo dev server auto-rebuilds; just refresh browser
- **baseURL in config.toml** is set for GitHub Pages deployment
