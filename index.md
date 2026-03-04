---
layout: default
title: Home
---

## Latest Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }})  
  <span class="post-meta">{{ post.date | date: "%B %d, %Y" }}</span>

{% endfor %}