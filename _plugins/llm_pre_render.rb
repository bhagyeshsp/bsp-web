# _plugins/llm_pre_render.rb
#
# Pre-renders Liquid in every page's content BEFORE Jekyll's main render phase.
# Stores results in site.data['llm_content'] keyed by page URL, so llms-full.txt
# can access rendered content via site.data.llm_content[p.url].
#
# This solves the problem where Jekyll hasn't rendered some pages yet when
# llms-full.txt iterates over site.pages, causing {% include %} and
# {% for item in site.data.x %} tags to appear as raw Liquid text.
#
# Portable: drop this file into _plugins/ of any Jekyll project alongside
# the llms-full.txt and llms.txt templates.

Jekyll::Hooks.register :site, :pre_render do |site|
  payload = site.site_payload

  # Use site.data to store rendered content — accessible from Liquid as site.data.llm_content
  site.data["llm_content"] ||= {}

  (site.pages + site.posts.docs).each do |doc|
    # Skip the LLM files themselves to avoid circular rendering
    next if doc.url.to_s.match?(/\/llms.*\.txt/)

    raw = doc.content.to_s
    next if raw.strip.empty?

    begin
      page_payload = payload.merge("page" => doc.to_liquid)

      rendered = site.liquid_renderer
        .file(doc.path)
        .parse(raw)
        .render!(page_payload, {
          registers: { site: site, page: doc.to_liquid },
          strict_filters: false,
          strict_variables: false
        })

      # Run converters (Markdown → HTML).
      # Jekyll::Page has .converters; Jekyll::Document does not.
      converted = if doc.respond_to?(:converters)
        doc.converters.reduce(rendered) do |output, converter|
          begin; converter.convert(output); rescue StandardError; output; end
        end
      else
        ext = File.extname(doc.path)
        converter = site.find_converter_instance(Jekyll::Converters::Markdown) if ext =~ /\.md|\.markdown/i
        converter ? (converter.convert(rendered) rescue rendered) : rendered
      end

      site.data["llm_content"][doc.url] = converted
    rescue StandardError => e
      Jekyll.logger.info "llm_pre_render:", "Could not pre-render #{doc.relative_path}: #{e.message}"
    end
  end

  Jekyll.logger.info "llm_pre_render:", "Stored #{site.data['llm_content'].size} pre-rendered pages/posts"
end
