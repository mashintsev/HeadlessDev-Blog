---
templateKey: blog-post
title: Различие в методах yield(), sleep(0), wait(0,1) and parkNanos(1)
date: 2012-09-06T06:56:00.000Z
description: Различие в методах yield(), sleep(0), wait(0,1) and parkNanos(1)
tags:
- Old posts
---

В описание к методам yield(), sleep(0), wait(0,1) and parkNanos(1) написано, что они делают одно и тоже.  
  
На самом деле это не так. Существует различие во времени отработки этих функций для коротких промежутков времени.  
  
  
  
Вот пример кода для тестирования:  
  

import java.util.concurrent.locks.LockSupport;

public class Pausing {
    public static void main(String... args) throws InterruptedException {
        int repeat = 10000;
        for (int i = 0; i < 3; i++) {
            long time0 = System.nanoTime();
            for (int j = 0; j < repeat; j++)
                Thread.yield();
            long time1 = System.nanoTime();
            for (int j = 0; j < repeat; j++)
                Thread.sleep(0);
            long time2 = System.nanoTime();
            synchronized (Thread.class) {
                for (int j = 0; j < repeat/10; j++)
                    Thread.class.wait(0, 1);
            }
            long time3 = System.nanoTime();
            for (int j = 0; j < repeat/10; j++)
                LockSupport.parkNanos(1);
            long time4 = System.nanoTime();

            System.out.printf("The average time to yield %.1f μs, sleep(0) %.1f μs, " +
                    "wait(0,1) %.1f μs and LockSupport.parkNanos(1) %.1f μs%n",
                    (time1 - time0) / repeat / 1e3, (time2 - time1) / repeat / 1e3, 
                    (time3 - time2) / (repeat/10) / 1e3, (time4 - time3) / (repeat/10) / 1e3);
        }
    }
}

  
  
И результаты тестов для различных платформ:  
  

## On Windows 7

The average time to yield 0.3 μs, sleep(0) 0.6 μs, wait(0,1) 999.9 μs and LockSupport.parkNanos(1) 1000.0 μs
The average time to yield 0.3 μs, sleep(0) 0.6 μs, wait(0,1) 999.5 μs and LockSupport.parkNanos(1) 1000.1 μs
The average time to yield 0.2 μs, sleep(0) 0.5 μs, wait(0,1) 1000.0 μs and LockSupport.parkNanos(1) 1000.1 μs

## On RHEL 5.x

The average time to yield 1.1 μs, sleep(0) 1.1 μs, wait(0,1) 2003.8 μs and LockSupport.parkNanos(1) 3.8 μs
The average time to yield 1.1 μs, sleep(0) 1.1 μs, wait(0,1) 2004.8 μs and LockSupport.parkNanos(1) 3.4 μs
The average time to yield 1.1 μs, sleep(0) 1.1 μs, wait(0,1) 2005.6 μs and LockSupport.parkNanos(1) 3.1 μs

## On Ubuntu 11.x

The average time to yield 0.4 μs, sleep(0) 0.4 μs, wait(0,1) 1084.8 μs and LockSupport.parkNanos(1) 53.9 μs
The average time to yield 0.2 μs, sleep(0) 0.3 μs, wait(0,1) 1104.8 μs and LockSupport.parkNanos(1) 53.1 μs
The average time to yield 0.3 μs, sleep(0) 0.3 μs, wait(0,1) 1088.2 μs and LockSupport.parkNanos(1) 52.4 μs