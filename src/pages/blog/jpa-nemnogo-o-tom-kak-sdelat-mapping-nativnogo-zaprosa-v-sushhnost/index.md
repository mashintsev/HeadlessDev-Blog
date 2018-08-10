---
templateKey: blog-post
title: JPA. Немного о том как сделать mapping нативного запроса в сущность
date: 2016-07-08T11:49:11.000Z
description: JPA. Немного о том как сделать mapping нативного запроса в сущность
tags:
- Old posts
---

Иногда использование JPQL невозможно, и приходится запрашивать сущности с помощью нативного SQL. Как же в этом случае декларативно описать mapping результата SQL в требуемую сущность? Если ваш запрос возвращает столбцы, которые вы хотите сделать mapping в определенную сущность, Hibernate позволяет это сделать двумя способами:

1.  использование неявного mapping, если запрос используется те же колонки, что и описаны в сущности
2.  создать свой собственный mapping

#### Неявный mapping

Неявныйmapping - самый простой и не требующий больших трудозатрат. Достаточно указать класс при вызове функции _createNativeQuery._

Book b = (Book) em.createNativeQuery("SELECT * FROM book b WHERE id = 1", Book.class).getSingleResult();

#### Собственный явный mapping

Если колонки в запросе не совпадают с полями сущности, есть возможность задать свой mapping для полей. Это можно сделать с помощью аннотации _@SqlResultSetMapping. _

@SqlResultSetMapping(
	name = "BookMapping", 
	entities = @EntityResult(
		entityClass = Book.class, 
		fields = {
			@FieldResult(name = "id", column = "id"),
			@FieldResult(name = "version", column = "version"),
			@FieldResult(name = "title", column = "title"),
			@FieldResult(name = "publishingDate", column = "publishingDate"),
			@FieldResult(name = "publisher", column = "publisherid")}))

Данная аннотация задает имя mapping и класс для которого он применяется. Теперь этот mapping можно использовать.

em.createNativeQuery("SELECT * FROM book b WHERE id = 1", "BookMapping").getSingleResult();