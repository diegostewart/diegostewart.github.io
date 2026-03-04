---
layout: default
title: Home
---

<div class="post-list">
  {% for post in site.posts %}
    <a href="{{ post.url }}" class="post-row">
      <div class="post-image">
        <img src="{{ post.image }}" alt="{{ post.title }}">
      </div>
      <div class="post-content">
        <h2>{{ post.title }}</h2>
        <p class="post-excerpt">
          {{ post.excerpt | strip_html | truncate: 140 }}
        </p>
        <p class="post-date">
          {{ post.date | date: "%B %d, %Y" }}
        </p>
      </div>
    </a>
  {% endfor %}
</div>