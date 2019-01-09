---
templateKey: blog-post
title: Perf4J is System.currentTimeMillis() as log4j is to System.out.println()
date: 2013-01-31T04:49:00.000Z
description: Perf4J is System.currentTimeMillis() as log4j is to System.out.println()
tags:
- Old posts
---

Perf4J is a set of utilities for calculating and displaying performance statistics for Java code.

> Perf4J is to System.currentTimeMillis() as log4j is to System.out.println()

Similarly, when new Java developers discover that they need to time specified blocks of code for performance logging and monitoring reasons, they often do something like this:

> long start = System.currentTimeMillis();  
> // execute the block of code to be timed  
> System.out.println("ms for block n was: " + (System.currentTimeMillis() - start));

Perf4J provides these features and more:

*   A simple stop watch mechanism for succinct timing statements.

*   A command line tool for parsing log files that generates aggregated statistics and performance graphs.

*   Easy integration with the most common logging frameworks and facades: log4j, java.util.logging, Apache Commons Logging and SLF4J (including logback).

*   Custom log4j and logback appenders to generate statistics and graphs in a running application.

*   The ability to expose performance statistics as JMX attributes, and to send notifications when statistics exceed specified thresholds.

*   A servlet for exposing performance graphs in a web application.

*   A [Profiled](http://perf4j.codehaus.org/apidocs/org/perf4j/aop/Profiled.html) annotation and a set of custom aspects that allow unobstrusive timing statements when coupled with an AOP framework such as AspectJ or Spring AOP.

*   An extensible architecture.

[Link](http://perf4j.codehaus.org/)

