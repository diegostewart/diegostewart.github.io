---
title: "Getting Started with Jekyll"
date: 2023-10-05
categories: [tutorial, jekyll]
tags: [jekyll, static-site, ruby]
---

# Getting Started with Jekyll

Jekyll is a static site generator that's perfect for blogs, portfolios, and documentation sites. In this post, I'll walk you through the basics of setting up a Jekyll site.

## Installation

First, make sure you have Ruby installed. Then:

```bash
gem install jekyll bundler
```

## Creating a New Site

```bash
jekyll new my-awesome-site
cd my-awesome-site
bundle exec jekyll serve
```

## Basic Structure

Jekyll sites have a simple structure:
- `_posts/` for blog posts
- `_layouts/` for page templates
- `_includes/` for reusable components
- `assets/` for CSS, JS, and images

That's it for now! More advanced topics coming soon.