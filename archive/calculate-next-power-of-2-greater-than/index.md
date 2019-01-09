---
templateKey: blog-post
title: Calculate the next power of 2, greater than or equal to x
date: 2013-05-20T09:00:00.000Z
description: Calculate the next power of 2, greater than or equal to x
tags:
- Old posts
---

  
Very short and simple method =) Use for yourself  
  
/**  
     \* Calculate the next power of 2, greater than or equal to x.<p>  
     \* From Hacker's Delight, Chapter 3, Harry S. Warren Jr.  
     *  
     \* @param x Value to round up  
     \* @return The next power of 2 from x inclusive  
     */  
    public static int ceilingNextPowerOfTwo(final int x)  
    {  
        return 1 << (32 - Integer.numberOfLeadingZeros(x - 1));  
    }  

