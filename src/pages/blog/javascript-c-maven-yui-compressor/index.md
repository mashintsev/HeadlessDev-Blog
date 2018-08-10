---
templateKey: blog-post
title: Минимизация JavaScript исходников c помощью Maven. YUI Compressor
date: 2011-05-03T08:51:00.000Z
description: Минимизация JavaScript исходников c помощью Maven. YUI Compressor
tags:
- Old posts
---

[Документация](http://alchim.sourceforge.net/yuicompressor-maven-plugin/compress-mojo.html)  
Пример для вставки в pom.xml  
  
<plugin>  
<groupId>net.alchim31.maven</groupId>  
<artifactId>yuicompressor-maven-plugin</artifactId>  
<executions>  
<execution>  
<phase>process-resources</phase>  
<goals>  
<goal>compress</goal>  
</goals>  
</execution>  
</executions>  
<configuration>  
<jswarn>false</jswarn>  
<nomunge>true</nomunge>  
<nosuffix>true</nosuffix>  
<disableOptimizations>true</disableOptimizations>  
<encoding>UTF-8</encoding>  
<linebreakpos>500</linebreakpos>  
<excludes>  
<exclude>js/ext/**/**.js</exclude>  
</excludes>  
</configuration>  
</plugin>