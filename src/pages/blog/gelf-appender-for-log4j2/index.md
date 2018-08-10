---
templateKey: blog-post
title: GELF appender for log4j2
date: 2013-05-22T12:48:00.000Z
description: GELF appender for log4j2
tags:
- Old posts
---

I start [project](https://github.com/mashintsev/gelfj2) gelfj2. It's very simple GELF implementation in pure Java with the Log4j2 appender.  
  
It uses [log4j2](http://logging.apache.org/log4j/2.x/) logging library and supports chunked messages which allows you to send large log messages (stacktraces, environment variables, additional fields, etc.) to a [Graylog2](http://www.graylog2.org/) server.

