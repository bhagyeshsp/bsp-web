#!/usr/bin/env node

/**
 * LLMS.txt Generator for Jekyll Sites
 * 
 * Uses Mozilla Readability (same algorithm as Firefox Reader View & Obsidian Clipper)
 * to extract clean content from Jekyll's built HTML pages.
 * 
 * Usage:
 *   node scripts/generate-llms.js
 * 
 * Configuration:
 *   1. Create llms.config.json in project root
 *   2. Or use CLI flags (see --help)
 *   3. Or configure in _config.yml under 'llms' key
 * 
 * CLI Flags:
 *   node scripts/generate-llms.js --site-dir _site --output _site/llms-full.txt
 * 
 * Example llms.config.json:
 *   {
 *     "baseUrl": "https://example.com",
 *     "title": "My Site",
 *     "description": "Site description",
 *     "excludeUrls": ["/secret/", "/drafts/"]
 *   }
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const TurndownService = require('turndown');
const turndownGFM = require('turndown-plugin-gfm').gfm;

// ============================================================================
// Configuration
// ============================================================================

const DEFAULT_CONFIG = {
  // Site directory containing built HTML files
  siteDir: '_site',
  
  // Output file path
  outputFile: '_site/llms-full.txt',
  
  // Site metadata (can be overridden via _config.yml or CLI)
  title: '',
  description: '',
  
  // URLs to exclude from generation
  // Add default exclusions for generated files
  excludeUrls: [
    '/llms.txt',
    '/llms-full.txt',
    '/404.html',
    '/404/',
    '/sitemap.xml',
    '/feed.xml',
    '/atom.xml'
  ],
  
  // Custom content selector (optional)
  // If not provided, uses Mozilla Readability's default detection
  contentSelector: null,
  
  // Additional file patterns to exclude
  excludePatterns: [
    /\.css$/,
    /\.js$/,
    /\.json$/,
    /\.xml$/,
    /\.ico$/,
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.gif$/,
    /\.svg$/,
    /\.webp$/,
    /\.woff$/,
    /\.woff2$/,
    /\.ttf$/,
    /\.eot$/
  ]
};

// ============================================================================
// Turndown Setup (HTML to Markdown Converter)
// ============================================================================

const turndownService = new TurndownService({
  headingStyle: 'atx',    // Use # for headings
  codeBlockStyle: 'fenced', // Use ``` for code blocks
  bulletListMarker: '-',   // Use - for bullet lists
  emDelimiter: '*'          // Use * for emphasis
});

// Add GitHub Flavored Markdown plugins (tables, strikethrough, task lists)
turndownService.use(turndownGFM);

// Custom rules for better markdown output

// Handle task lists (checkboxes)
turndownService.addRule('taskList', {
  filter: function(node) {
    return node.nodeName === 'INPUT' && node.type === 'checkbox' && node.disabled;
  },
  replacement: function(content) {
    return this.is.checked ? '[x]' : '[ ]';
  }
});

// Preserve line breaks in paragraphs
turndownService.addRule('lineBreak', {
  filter: 'br',
  replacement: function() {
    return '  \n';
  }
});

// Handle figure and figcaption
turndownService.addRule('figure', {
  filter: 'figure',
  replacement: function(content) {
    return '\n' + content + '\n';
  }
});

turndownService.addRule('figcaption', {
  filter: 'figcaption',
  replacement: function(content) {
    return '*' + content + '*';
  }
});

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Convert file path to URL path
 * _site/about/index.html -> /about/
 * _site/index.html -> /
 * _site/blog/2023/05/19/post/index.html -> /blog/2023/05/19/post/
 * _site/now/index.html -> /now/
 */
function filePathToUrlPath(filePath, siteDir) {
  let relativePath = path.relative(siteDir, filePath);
  
  // Remove .html extension
  relativePath = relativePath.replace(/\.html$/, '');
  
  // Handle /index suffix - convert /about/index -> /about
  // But preserve /blog/2023/05/19/ type paths (date-based posts)
  if (relativePath.endsWith('/index')) {
    relativePath = relativePath.replace(/\/index$/, '');
  }
  
  if (relativePath === '' || relativePath === 'index') {
    return '/';
  }
  
  // Ensure trailing slash for consistency
  if (!relativePath.endsWith('/')) {
    relativePath += '/';
  }
  
  return '/' + relativePath;
}

/**
 * Check if a URL should be excluded
 */
function shouldExclude(urlPath, excludeUrls, excludePatterns) {
  // Check exact matches
  if (excludeUrls.includes(urlPath) || excludeUrls.includes(urlPath.replace(/\/$/, ''))) {
    return true;
  }
  
  // Check patterns
  for (const pattern of excludePatterns) {
    if (pattern.test(urlPath)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Load JSON config file (llms.config.json) if available
 */
function loadJsonConfig() {
  const configPath = 'llms.config.json';
  
  try {
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(configContent);
      console.log('📋 Loaded configuration from llms.config.json');
      return config;
    }
  } catch (error) {
    console.warn('Warning: Could not parse llms.config.json:', error.message);
  }
  
  return null;
}

/**
 * Extract metadata from HTML using JSDOM
 */
function extractMetadata(doc, url) {
  const metadata = {
    title: '',
    description: '',
    date: null,
    author: null,
    siteName: ''
  };
  
  // Title: og:title > title tag > h1
  metadata.title = 
    doc.querySelector('meta[property="og:title"]')?.content ||
    doc.querySelector('title')?.textContent?.split('|')[0]?.split('-')[0]?.trim() ||
    doc.querySelector('h1')?.textContent?.trim() ||
    '';
  
  // Description: og:description > meta description
  metadata.description = 
    doc.querySelector('meta[property="og:description"]')?.content ||
    doc.querySelector('meta[name="description"]')?.content ||
    '';
  
  // Date: article:published_time > schema.org datePublished
  const publishedTime = 
    doc.querySelector('meta[property="article:published_time"]')?.content ||
    doc.querySelector('meta[name="date"]')?.content ||
    '';
  
  if (publishedTime) {
    metadata.date = publishedTime.split('T')[0]; // Get YYYY-MM-DD
  }
  
  // Author
  metadata.author = 
    doc.querySelector('meta[name="author"]')?.content ||
    doc.querySelector('meta[property="article:author"]')?.content ||
    '';
  
  // Site name
  metadata.siteName = 
    doc.querySelector('meta[property="og:site_name"]')?.content ||
    '';
  
  return metadata;
}

/**
 * Parse HTML file and extract content using Readability
 */
function parseHtmlFile(filePath, urlPath, options) {
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    
    // Create JSDOM instance
    const dom = new JSDOM(html, {
      url: options.baseUrl + urlPath,
      contentType: 'text/html',
      includeNodeLocations: true,
      pretendToBeVisual: true
    });
    
    const document = dom.window.document;
    
    // Extract metadata first
    const metadata = extractMetadata(document, urlPath);
    
    // Try custom selector first if provided
    let content = null;
    let readability;
    
    if (options.contentSelector) {
      const customElement = document.querySelector(options.contentSelector);
      if (customElement) {
        // Clone the element to avoid modifying original
        const clone = customElement.cloneNode(true);
        
        // Create a temporary document with just this content
        const tempDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        tempDom.window.document.body.appendChild(clone);
        
        readability = new Readability(tempDom.window.document);
        const result = readability.parse();
        
        if (result) {
          content = result;
        }
      }
    }
    
    // Use Readability's automatic detection
    if (!content) {
      readability = new Readability(document);
      content = readability.parse();
    }
    
    if (!content) {
      console.warn(`  Warning: Could not extract content from ${urlPath}`);
      return null;
    }
    
    // Convert HTML content to Markdown
    let markdown = turndownService.turndown(content.content);
    
    // Clean up excessive newlines
    markdown = markdown.replace(/\n{4,}/g, '\n\n');
    
    return {
      title: content.title || metadata.title,
      url: options.baseUrl + urlPath,
      description: content.excerpt || metadata.description,
      date: metadata.date,
      author: metadata.author,
      content: markdown
    };
    
  } catch (error) {
    console.error(`  Error parsing ${urlPath}:`, error.message);
    return null;
  }
}

/**
 * Categorize pages into static pages and blog posts
 * Posts typically have /blog/ prefix or date-based URLs (YYYY/MM/DD/)
 */
function categorizePages(pages) {
  const staticPages = [];
  const blogPosts = [];
  
  for (const page of pages) {
    const url = page.url;
    
    // Check for blog post patterns:
    // - /blog/ prefix
    // - Date-based URLs: /YYYY/MM/DD/
    // - /posts/ prefix
    // - /guide/ can be treated as posts (optional)
    const isPost = 
      url.includes('/blog/') ||
      url.match(/\/\d{4}\/\d{2}\/\d{2}\//) ||
      url.includes('/posts/') ||
      url.includes('/uncategorized/');
    
    if (isPost) {
      blogPosts.push(page);
    } else {
      staticPages.push(page);
    }
  }
  
  // Sort posts by date descending
  blogPosts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date);
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
  
  // Sort pages by title
  staticPages.sort((a, b) => {
    return (a.title || '').localeCompare(b.title || '');
  });
  
  return { staticPages, blogPosts };
}

/**
 * Generate the llms.txt (site map - just links)
 */
function generateLlmsTxt(staticPages, blogPosts, options) {
  const lines = [];
  
  // Header
  lines.push(`# ${options.title || 'Website'}`);
  lines.push('');
  
  if (options.description) {
    lines.push(`> ${options.description}`);
    lines.push('');
  }
  
  lines.push(`Last Updated: ${new Date().toISOString()}`);
  lines.push('');
  
  // Static Pages
  if (staticPages.length > 0) {
    lines.push('## Pages');
    for (const page of staticPages) {
      lines.push(`- [${page.title}](${page.url})`);
    }
    lines.push('');
  }
  
  // Blog Posts
  if (blogPosts.length > 0) {
    lines.push('## Posts');
    for (const post of blogPosts) {
      const dateStr = post.date ? `(${post.date}) ` : '';
      lines.push(`- [${post.title}](${post.url})`);
    }
    lines.push('');
  }
  
  return lines.join('\n');
}

/**
 * Generate the llms-full.txt content with full page content
 */
function generateLlmsFullTxt(staticPages, blogPosts, options) {
  const lines = [];
  
  // Header
  lines.push(`# ${options.title || 'Website'}`);
  lines.push('');
  
  if (options.description) {
    lines.push(`> ${options.description}`);
    lines.push('');
  }
  
  lines.push(`Last Updated: ${new Date().toISOString()}`);
  lines.push('');
  
  // Static Pages first
  if (staticPages.length > 0) {
    lines.push('## Pages');
    lines.push('');
    
    for (const page of staticPages) {
      lines.push(`### ${page.title}`);
      lines.push('');
      lines.push(`URL: ${page.url}`);
      
      if (page.description) {
        lines.push(`Description: ${page.description}`);
      }
      
      lines.push('');
      lines.push(page.content);
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  }
  
  // Blog Posts
  if (blogPosts.length > 0) {
    lines.push('## Posts');
    lines.push('');
    
    for (const post of blogPosts) {
      lines.push(`### ${post.title}`);
      lines.push('');
      lines.push(`URL: ${post.url}`);
      
      if (post.date) {
        lines.push(`Date: ${post.date}`);
      }
      
      if (post.description) {
        lines.push(`Description: ${post.description}`);
      }
      
      if (post.author) {
        lines.push(`Author: ${post.author}`);
      }
      
      lines.push('');
      lines.push(post.content);
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  }
  
  return lines.join('\n');
}

/**
 * Main function
 */
function main() {
  console.log('\n🚀 LLMS.txt Generator (Mozilla Readability)\n');
  
  // Parse CLI arguments
  const args = process.argv.slice(2);
  let config = { ...DEFAULT_CONFIG };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--site-dir':
        config.siteDir = args[++i];
        config.outputFile = path.join(config.siteDir, 'llms-full.txt');
        break;
      case '--output':
        config.outputFile = args[++i];
        break;
      case '--title':
        config.title = args[++i];
        break;
      case '--description':
        config.description = args[++i];
        break;
      case '--base-url':
        config.baseUrl = args[++i];
        break;
      case '--help':
        console.log(`
LLMS.txt Generator for Jekyll Sites

Usage: node scripts/generate-llms.js [options]

Options:
  --site-dir <path>       Site directory (default: _site)
  --output <path>         Output file path for llms-full.txt
  --output-llms <path>    Output file path for llms.txt (optional)
  --title <title>         Site title
  --description <desc>    Site description
  --base-url <url>        Base URL for links (default: https://example.com)
  --help                  Show this help message

Configuration:
  Create llms.config.json in your project root. See README for details.
`);
        process.exit(0);
    }
  }
  
  // Default base URL if not provided
  config.baseUrl = config.baseUrl || 'https://example.com';
  
  // Load config from llms.config.json (only source for exclusions)
  const jsonConfig = loadJsonConfig();
  if (jsonConfig) {
    config = { ...config, ...jsonConfig };
  }
  
  // Set default output paths if not specified
  config.outputFile = config.outputFile || path.join(config.siteDir, 'llms-full.txt');
  config.outputLlmsFile = config.outputLlmsFile || path.join(config.siteDir, 'llms.txt');
  
  console.log(`📁 Site directory: ${config.siteDir}`);
  console.log(`📄 Output file: ${config.outputFile}`);
  console.log(`🔗 Base URL: ${config.baseUrl}`);
  console.log(`⏭️  Excluded URLs: ${config.excludeUrls.join(', ')}`);
  console.log('');
  
  // Find all HTML files
  const htmlFiles = [];
  
  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.html') || entry.name.endsWith('.htm')) {
        htmlFiles.push(fullPath);
      }
    }
  }
  
  try {
    walkDir(config.siteDir);
  } catch (error) {
    console.error(`Error: Site directory '${config.siteDir}' not found!`);
    console.error('Make sure to run this after Jekyll has built the site.');
    process.exit(1);
  }
  
  console.log(`📊 Found ${htmlFiles.length} HTML files`);
  console.log('');
  
  // Process each HTML file
  const pages = [];
  
  for (const filePath of htmlFiles) {
    const urlPath = filePathToUrlPath(filePath, config.siteDir);
    
    // Skip excluded URLs
    if (shouldExclude(urlPath, config.excludeUrls, config.excludePatterns)) {
      continue;
    }
    
    // Parse the file
    const page = parseHtmlFile(filePath, urlPath, config);
    
    if (page && page.content && page.content.trim().length > 0) {
      pages.push(page);
    }
  }
  
  console.log(`✅ Successfully processed ${pages.length} pages`);
  console.log('');
  
  // Categorize pages into static pages and blog posts
  const { staticPages, blogPosts } = categorizePages(pages);
  
  console.log(`📂 Static pages: ${staticPages.length}`);
  console.log(`📝 Blog posts: ${blogPosts.length}`);
  console.log('');
  
  // Generate llms.txt (site map)
  const llmsOutput = generateLlmsTxt(staticPages, blogPosts, config);
  fs.writeFileSync(config.outputLlmsFile, llmsOutput, 'utf-8');
  console.log(`📝 Generated: ${config.outputLlmsFile}`);
  console.log(`📏 Size: ${(llmsOutput.length / 1024).toFixed(2)} KB`);
  
  // Generate llms-full.txt (with full content)
  const fullOutput = generateLlmsFullTxt(staticPages, blogPosts, config);
  fs.writeFileSync(config.outputFile, fullOutput, 'utf-8');
  
  console.log(`📝 Generated: ${config.outputFile}`);
  console.log(`📏 Size: ${(fullOutput.length / 1024).toFixed(2)} KB`);
  console.log('');
  console.log('✨ Done!\n');
}

// Run the main function
main();
