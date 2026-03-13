# LLMS.txt Generator

A robust llms.txt and llms-full.txt generator for Jekyll sites using Mozilla Readability - the same algorithm that powers Firefox Reader View and Obsidian Web Clipper.

## Installation

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Create `llms.config.json` in your project root (see Configuration below).

## Usage

### Basic Usage

After Jekyll builds your site, run:

```bash
node scripts/generate-llms.js
```

This generates both:
- `_site/llms.txt` - Site map with links only
- `_site/llms-full.txt` - Full content for each page

### With Jekyll Build

Add to your `package.json` scripts:

```json
{
  "scripts": {
    "build": "jekyll build && node scripts/generate-llms.js"
  }
}
```

Then run:
```bash
npm run build
```

## GitHub Actions Setup

This project uses GitHub Actions to build and deploy. The workflow is configured in `.github/workflows/pages.yml`.

### What the workflow does:

1. **Checkout** - Gets your code
2. **Setup Ruby** - Installs Ruby for Jekyll
3. **Setup Node.js** - Installs Node.js for the LLMS generator
4. **Install Ruby dependencies** - Runs `bundle install`
5. **Install Node.js dependencies** - Runs `npm install`
6. **Build Jekyll site** - Runs `jekyll build`
7. **Generate LLMS files** - Runs `node scripts/generate-llms.js`
8. **Deploy** - Pushes built site to GitHub Pages

### For other projects:

Copy these files to your Jekyll project:
- `.github/workflows/pages.yml` - GitHub Actions workflow
- `scripts/generate-llms.js` - The generator script
- Update `package.json` with dependencies

Then create `llms.config.json` with your site settings.

## Configuration

All configuration is managed in `llms.config.json` in your project root.

**Note:** You can name this file anything and place it anywhere, but you'll need to modify the script to point to it. The default expects it in the project root.

### Example Configuration

```json
{
  "baseUrl": "https://yourdomain.com",
  "title": "Your Site Title",
  "description": "Your site description",
  "siteDir": "_site",
  "outputFile": "_site/llms-full.txt",
  "outputLlmsFile": "_site/llms.txt",
  "excludeUrls": [
    "/secret/",
    "/drafts/",
    "/private/"
  ]
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | string | `https://example.com` | Base URL for your site |
| `title` | string | `Website` | Site title (appears in header) |
| `description` | string | `` | Site description |
| `siteDir` | string | `_site` | Directory containing built HTML files |
| `outputFile` | string | `_site/llms-full.txt` | Output path for llms-full.txt |
| `outputLlmsFile` | string | `_site/llms.txt` | Output path for llms.txt |
| `excludeUrls` | array | (see below) | URLs to exclude |

### Default Excluded URLs

The following URLs are always excluded:
- `/llms.txt`
- `/llms-full.txt`
- `/404.html`
- `/404/`
- `/sitemap.xml`
- `/feed.xml`
- `/atom.xml`

Plus any URLs you specify in `excludeUrls`.

## How It Works

1. **HTML Parsing**: Uses JSDOM to parse each HTML file in the site directory
2. **Content Extraction**: Uses Mozilla Readability algorithm to find the main article content
3. **Categorization**: Automatically detects static pages vs blog posts
4. **Markdown Conversion**: Uses Turndown with GitHub Flavored Markdown support
5. **Output Generation**: Creates both llms.txt (structure) and llms-full.txt (content)

### Page Categorization

The script automatically categorizes pages into:

- **Pages**: Static pages (about, contact, etc.) - sorted alphabetically by title
- **Posts**: Blog posts - sorted by date (newest first)

Posts are detected by URL patterns:
- `/blog/` prefix
- Date-based URLs (`/YYYY/MM/DD/`)
- `/posts/` prefix
- `/uncategorized/` prefix

## Portability

This script is designed to be portable across Jekyll projects:

1. Copy `scripts/generate-llms.js` to your Jekyll project's `scripts/` folder
2. Copy/add these to `package.json`:
   ```json
   {
     "dependencies": {
       "@mozilla/readability": "^0.5.0",
       "jsdom": "^22.1.0",
       "turndown": "^7.1.2",
       "turndown-plugin-gfm": "^1.0.2"
     }
   }
   ```
3. Run `npm install`
4. Create `llms.config.json` with your site settings
5. Run after Jekyll build: `node scripts/generate-llms.js`

## About the Old Ruby Plugin

The old Ruby plugin (`_plugins/llm_context_builder.rb`) is **no longer needed** and can be safely deleted.

- It used `reverse_markdown` which had parsing issues
- The new Node.js solution uses Mozilla Readability (same as Obsidian)
- It generates both llms.txt and llms-full.txt automatically
- There's no "fallback" - the Node.js script replaces it entirely

## Troubleshooting

### "Site directory not found"

Make sure to run the script after Jekyll has built:
```bash
jekyll build && node scripts/generate-llms.js
```

### Wrong URLs

Ensure your `baseUrl` matches exactly what's in Jekyll config (including https:// and trailing slash).

### Posts not categorized correctly

The script detects posts by URL patterns. If you have custom post URLs, you may need to adjust the categorization logic in `scripts/generate-llms.js`.

## Dependencies

- `@mozilla/readability`: Mozilla's Readability algorithm
- `jsdom`: DOM implementation for Node.js
- `turndown`: HTML to Markdown converter
- `turndown-plugin-gfm`: GitHub Flavored Markdown support

## License

MIT
