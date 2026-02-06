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
│   ├── konferencja.md   # Conference page - video list
│   ├── faq.md           # FAQ questions (accordion)
│   ├── kim-jestesmy.md  # Partners list
│   └── jak-dolaczyc.md  # Join page text
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
- **Mobile:** Hamburger menu at 768px breakpoint

## Content Editing

### Homepage photos (`content/_index.md`)

```yaml
images:
  - file: "photo.jpg"           # Regular image (1/3 width)
  - file: "photo2.jpg"
    wide: true                  # Wide image (2/3 width, others stack)
  - file: "photo3.jpg"
    superwide: true             # Full row width
```

**Grid layout rules:**
- 3 images per row
- Only 1 wide image per row allowed
- Wide image takes 2/3 width, other 2 images stack vertically in remaining 1/3
- Wide image position (1st, 2nd, 3rd in the group of 3) determines layout
- Superwide images get their own full-width row (rendered after regular images)
- Order in the YAML list = order on page (no alphabetical sorting)

**To add new photos:**
1. Put image file in `static/wizualizacje/`
2. Generate thumbnail: `sips -Z 1200 static/wizualizacje/FILENAME --out static/wizualizacje/thumbs/FILENAME`
3. Add entry to `images:` list in `content/_index.md`

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
```

### FAQ (`content/faq.md`)

```yaml
questions:
  - question: "Question text?"
    answer: "Answer text."
```

### Intro text (`content/_index.md`)

```yaml
intro: "Your intro paragraph text here."
```

Displayed at the top of the homepage above the photo grid.

### YouTube video (`content/_index.md`)

```yaml
youtubeID: "Z0LpndsMA0w"    # Just the ID, not full URL
```

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
