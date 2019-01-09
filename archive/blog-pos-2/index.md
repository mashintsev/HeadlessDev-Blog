---
templateKey: blog-post
title: Обмен значениями двух численных переменных
date: 2013-02-21T11:26:00.000Z
description: Обмен значениями двух численных переменных
tags:
- Old posts
---

Есть 3 очень простых способа поменять значения 2х числовых переменных без использования временной переменной  

  

Может кому-нибудь пригодится  

  

Релизациях на Java

  

**1) Сумма-Разность**

  

int a = 10;

int b = 20;

  

System.out.println("value of a and b before swapping, a: " + a +" b: " + b);

  

_//__swapping value of two numbers without using temp variable_

a = a+ b; _//__now a is 30 and b is 20_

b = a -b; _//__now a is 30 but b is 10 (original value of a)_

a = a -b; _//__now a is 20 and b is 10, numbers are swapped_

  

System.out.println("value of a and b after swapping, a: " + a +" b: " + b);

  

Output:

value of a and b before swapping, a: 10 b: 20

value of a and b after swapping, a: 20 b: 10

  

  
**2) Magic XOR**

A       B       A^B (A XOR B)

0       0       0 (zero because operands are same)

0       1       1

1       0       1 (one because operands are different)

1       1       0

  

int a = 2; _//__0010 in binary_

int b = 4; _//__0100 in binary_

System.out.println("value of a and b before swapping, a: " + a +" b: " + b);

_//__swapping value of two numbers without using temp variable and XOR bitwise operator     _

a = a^b; _//__now a is 6 and b is 4_

b = a^b; _//__now a is 6 but b is 2 (original value of a)_

a = a^b; _//__now a is 4 and b is 2, numbers are swapped_

System.out.println("value of a and b after swapping using XOR bitwise operation, a: " + a +" b: " + b);

  

value of a and b before swapping, a: 2 b: 4

value of a and b after swapping using XOR bitwise operation, a: 4 b: 2

  
  

**3) Произведение-Деление**

  

int a = 6;

int b = 3;

  

System.out.println("value of a and b before swapping, a: " + a +" b: " + b);

  

_//__swapping value of two numbers without using temp variable using multiplication and division_

a = a*b; _//__now a is 18 and b is 3_

b = a/b; _//__now a is 18 but b is 6 (original value of a)_

a = a/b; _//__now a is 3 and b is 6, numbers are swapped_

  

System.out.println("value of a and b after swapping using multiplication and division, a: " + a +" b: " + b);

  

Output:

value of a and b before swapping, a: 6 b: 3

value of a and b after swapping using multiplication and division, a: 3 b: 6

  
  

  

Как видите количество действий не отличается от варианта с временной переменной. 

