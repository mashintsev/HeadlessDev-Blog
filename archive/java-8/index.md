---
templateKey: blog-post
title: Java 8. Простейший локальный кэш
date: 2014-03-07T09:52:00.000Z
description: Java 8. Простейший локальный кэш
tags:
- Old posts
---

В Java 8 с появлением лямбда выражений можно реализовать простой и функциональный локальных кэш.

  

Для хранения кэша будем использовать ConcurrentHashMap.

  

В интерфейсе Map появился новый метод computeIfAbsent. Который позволяет задавать лябда выражение для вычисления значения.

  

Пример для вычисление чисел Фибоначчи с использованием кэша.

  

> import java.util.Map;  
> import java.util.concurrent.ConcurrentHashMap;  
> /**  
>  \* Created with IntelliJ IDEA.  
>  \* User: imashintsev  
>  \* Date: 3/7/14  
>  \* Time: 4:35 PM  
>  */  
> public class LocalCache {  
> private static Map<Integer, Integer> cache = new ConcurrentHashMap<>();  
>   
> static int fibonacci(int i) {  
> if (i == 0)  
> return i;  
> if (i == 1)  
> return 1;  
> return cache.computeIfAbsent(i, (key) -> {  
> System.out.println("Slow calculation of " + key);  
> return fibonacci(key - 2) + fibonacci(key - 1);  
> });  
> }  
> public static final void main(String\[\] args) {  
> for (int i = 0; i <= 10; i++) {  
> System.out.println("F(" + i + ")=" + fibonacci(i));  
> }  
> }  
> }

  

Вывод работы программы:

> F(0)=0  
> F(1)=1  
> Slow calculation of 2  
> F(2)=1  
> Slow calculation of 3  
> F(3)=2  
> Slow calculation of 4  
> F(4)=3  
> Slow calculation of 5  
> F(5)=5  
> Slow calculation of 6  
> F(6)=8  
> Slow calculation of 7  
> F(7)=13  
> Slow calculation of 8  
> F(8)=21  
> Slow calculation of 9  
> F(9)=34  
> Slow calculation of 10  
> F(10)=55

  

