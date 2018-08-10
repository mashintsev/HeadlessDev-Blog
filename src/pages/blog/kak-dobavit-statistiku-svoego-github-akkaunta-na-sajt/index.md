---
templateKey: blog-post
title: Как добавить статистику своего GitHub аккаунта на сайт?
date: 2016-08-09T15:55:52.000Z
description: Как добавить статистику своего GitHub аккаунта на сайт?
tags:
- Old posts
---

Все достаточно просто. [Девушка из Бангалора](https://github.com/surbhioberoi) уже все сделала за тебя. Она разработала виджет, который можно вставлять на любой сайт \- от тебя потребуется только вставить имя аккаунта. Я уже добавил его на своей сайт в правую колонку. Вот что нужно вставить в исходники для добавления виджета:

<div class="github-widget" data-username="mashintsev"></div>
<script src="https://npmcdn.com/github-card@1.2.1/dist/widget.js"></script>

На одну страницу можно добавить несколько виджетов:

<div class="github-widget" data-username="github"></div>
<div class="github-widget" data-username="mashintsev"></div>
<script src="https://npmcdn.com/github-card@1.2.1/dist/widget.js"></script>

Исходники проекта можно посмотреть [тут](https://github.com/surbhioberoi/github-widget).