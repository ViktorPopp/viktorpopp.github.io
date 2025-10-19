# Fetch files from URLs as if they were local
require "open-uri"

# Tell Middleman that the site's source files are in the `src/` folder
set :source, "src"

# Use Redcarpet as the Markdown engine
set :markdown_engine, :redcarpet

# Enables:
# `fenced_code_blocks`  -> Triple-backtick code blocks
# `autolink`            -> Automatically convert URLs into clickable links
# `tables`              -> Supports Markdown tables
# Disables:
# `smartypants`         -> Automatic typographic replacements (like “curly quotes”)
set :markdown, fenced_code_blocks: true, smartypants: false, autolink: true, tables: true

# Prevent layouts from being applied to XML, JSON, and TXT files.
page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

activate :syntax                          # Syntax highlighting for code blocks
activate :directory_indexes               # Pretty URLs (e.g., /about/ instead of /about.html)
activate :breadcrumbs, separator: " / "   # Breadcrumb navigation

# Configure a blog in `/news`.
activate :blog do |blog|
  blog.prefix = "news"
  # Use a specific layout for posts and templates for tags and calendars.
  blog.layout = "layouts/news"
  blog.tag_template = "news/tag.html"
  blog.calendar_template = "news/calendar.html"
end

# When building for production minify CSS and JS for faster load times
configure :build do
  activate :minify_css
  activate :minify_javascript
end
