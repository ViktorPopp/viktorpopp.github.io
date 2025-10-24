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

# Configure a blog in `/blog`.
activate :blog do |blog|
  blog.prefix = "blog"
  blog.layout = "layouts/blog"
  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"
end

# When building for production minify CSS and JS for faster load times
configure :build do
  activate :minify_css
  activate :minify_javascript
end

# When everything has been configured set the page titles
ready do
  sitemap.resources.each do |resource|
    next unless resource.data.title.nil?

    case resource.locals["page_type"]
    when "tag"
      resource.data.title = resource.locals["tagname"].capitalize
    when "year", "month", "day"
      resource.data.title = resource.locals[resource.locals["page_type"]].to_s
    end
  end
end
