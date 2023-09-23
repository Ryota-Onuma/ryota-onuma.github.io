---
title: "Introduction to my blog"
date: 2023-09-19T18:38:14+09:00
draft: false
tags: [diary,release-note]
categories: [Release Note]
description: "This is my first post."
---

# Hello World

Hi! I've decided to post articles in English on my blog.

In this article, I'll introduce the tools I've adopted for my blog system and provide an outlook on my blog.

# Adopted technologies

## Hugo

This blog is generated using [Hugo](https://gohugo.io/), which is a static site generator. There are several reasons why I adopted it, as follows:

### Easy to customize templates with Go template syntax 

As I said, Hugo is a static site generator and it is developed with Go. By using it, developers can generate html files and also customize templates for generating html files with Go template syntax. In my daily work life, I sometimes write programs with Go template syntax, so I guessed hugo should fit to me. 


### Many useful free design themes

Hugo has a lot of design themes that are easy to customize. From [this](https://themes.gohugo.io/) website, you can choose a Hugo theme which you want to apply to your site, and integrate it with git submodule system. For more details on how to do this, please refer to [this website](https://gohugo.io/hugo-modules/theme-components/). 

In addition, you can override the theme as you want to do like [this](https://gohugobrasil.netlify.app/themes/customizing/). This feature was convenient for me. Writing CSS from scratch was so boring for me that I extended [Docura](https://themes.gohugo.io/themes/docura/) to build this blog. 

Moreover, thanks to Docura, my blog has a function to change theme colors. I chose three color variations which are combinations of my favorites. Feel free to try them from the button on the header.

### Serverless

Serverless was essential to reduce running costs. 


## GitHub Pages

This blog is hosted on GitHub Pages. It was so easy to deploy because I only had to follow the steps introduced in [this official post](https://gohugo.io/hosting-and-deployment/hosting-on-github/ ). The point that tools to maintain this blog depends on only GitHub is also fascinating. 

# About this blog

Actually, I've tried to create blog system for about 4 years. However, developing a blog platform has been more enjoyable for me than writing articles. I have scrapped the past blog systems, and each time, created new one again with different technologies. I guess this version is 10.0.0 . I hope that it will be more fun to post articles than developing a new platform again. 

On my blog, I'm going to publish my articles in some categories such as like below:

- Abont programming 
- About books I read
- About English 
- About my hobby

As you can guess, I'm interested in posting an article with both Japanese version and English version. Therefore, my blog supports both languages. You can switch between languages using the button in the header.
