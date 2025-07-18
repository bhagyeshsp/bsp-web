---
layout: page
title: Newsletter
permalink: /newsletter/
description: "Stay updated with my insights! Sisyphus Notes on tech & design, plus the complete archive of The Friday Newsletter (TFN)."

---

My last long-running weekly newsletter was named The Friday Newsletter (TFN).
On February 7th, 2025 I sunset it to focus on growing [my firm](https://sisyphusconsulting.org).

You can check out the full newsletter archive at the bottom of this page.

And what about writing?

I shifted to publishing Sisyphus Notes. Unlike The Friday Newsletter, these notes do not follow any weekly or monthly goals.

{% include newsletter.html %}

<br>
<br>
# TFN Archive
<p class="page-description">The full archive of all letters sent under The Friday Newsletter.</p>


<div class="post-list">
    {% for post in site.posts %}
      {% if post.category contains "Newsletter" %}
      <article class="post-item">
        <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
        <h2 class="post-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>
        <p class="post-excerpt">{{ post.content | strip_html | truncatewords: 50 }}</p>
      </article>
      {% endif %}
    {% endfor %}
  </div>