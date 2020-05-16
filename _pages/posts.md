---
layout: year_archive
permalink: /posts/
title: "Posts by Year"
author_profile: true
---
{% include group-by-array collection=site.posts field="year" %}

{% for tag in group_names %}
  {% assign posts = group_items[forloop.index0] %}
  <h2 id="{{ tag | slugify }}" class="archive__subtitle">{{ tag }}</h2>
  {% for post in posts %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %}