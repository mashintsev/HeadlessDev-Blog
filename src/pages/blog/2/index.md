---
templateKey: blog-post
title: Проверка является ли число степенью 2
date: 2013-05-22T06:01:00.000Z
description: Проверка является ли число степенью 2
tags:
- Old posts
---

Очень простой метод. Реализация на java  
  

> if (Integer.bitCount(bufferSize) == 1) {  
>          //степень 2  
> } else {  
>         //не является степенью 2  
> }

И метод bitCount из Java SDK  

> /**  
>      \* Returns the number of one-bits in the two's complement binary  
>      \* representation of the specified <tt>int</tt> value.  This function is  
>      \* sometimes referred to as the <i>population count</i>.  
>      *  
>      \* @return the number of one-bits in the two's complement binary  
>      \*     representation of the specified <tt>int</tt> value.  
>      \* @since 1.5  
>      */  
>     public static int bitCount(int i) {  
>         // HD, Figure 5-2  
> i = i - ((i >>> 1) & 0x55555555);  
> i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);  
> i = (i + (i >>> 4)) & 0x0f0f0f0f;  
> i = i + (i >>> 8);  
> i = i + (i >>> 16);  
> return i & 0x3f;  
>     } 

