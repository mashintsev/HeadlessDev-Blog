---
templateKey: blog-post
title: The twelve-factor app
date: 2015-09-11T07:47:04.000Z
description: The twelve-factor app
tags:
- Old posts
---

![Снимок экрана 2015-09-11 в 7.16.26](/img/df7c7ab9-a129-4aaa-ba3f-cab41833d5d6.png) Вы еще не знаете как построить свою SaaS платформу, тогда этот [ресурс](http://12factor.net/) Вам очень поможет в этом. На нем собраны 12 факторов, которые необходимо учитывать при создании приложения. 

# The Twelve Factors

## [I. Codebase](http://12factor.net/codebase)

### One codebase tracked in revision control, many deploys

## [II. Dependencies](http://12factor.net/dependencies)

### Explicitly declare and isolate dependencies

## [III. Config](http://12factor.net/config)

### Store config in the environment

## [IV. Backing Services](http://12factor.net/backing-services)

### Treat backing services as attached resources

## [V. Build, release, run](http://12factor.net/build-release-run)

### Strictly separate build and run stages

## [VI. Processes](http://12factor.net/processes)

### Execute the app as one or more stateless processes

## [VII. Port binding](http://12factor.net/port-binding)

### Export services via port binding

## [VIII. Concurrency](http://12factor.net/concurrency)

### Scale out via the process model

## [IX. Disposability](http://12factor.net/disposability)

### Maximize robustness with fast startup and graceful shutdown

## [X. Dev/prod parity](http://12factor.net/dev-prod-parity)

### Keep development, staging, and production as similar as possible

## [XI. Logs](http://12factor.net/logs)

### Treat logs as event streams

## [XII. Admin processes](http://12factor.net/admin-processes)

### Run admin/management tasks as one-off processes