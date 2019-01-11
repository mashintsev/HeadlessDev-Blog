---
templateKey: blog-post
title: Добавление CSS стилей на html страницу
date: 2012-04-04T07:46:00.000Z
description: Добавление CSS стилей на html страницу
tags:
- Old posts
---

Существует 4 способа добавить CSS на страницу:  
  
1. **Вложение** — CSS код прописывается непосредственно в нужном теге Html элемента с помощью атрибута Style.  
Для любого тэга можно задать стиль. Стиль определяется внутри атрибута style.  
Например, **<p  style="background: red"></p> **.  
![таблица стилей css](/img/fc398dd0-d4b0-4fc0-9ea0-617dbe7c9463.png)  
  
  
Данный способ не рекомендуется для использования. Использовать такой способ можно только при разработки и экспериментировании.  
2. **Встраивание()** — весь CSS код для web документа прописывается в шапке этого документа (внутри тегов Head) с помощью элемента Style  
Данный способ похож на предыдущий. Но все определения стилей описываются в одном месте и для того чтобы применить стиль какому-либо элементу необходимо использовать селектор.  
![css это](/img/5220494c-0b1a-40dd-b4bb-48cace0ce658.png)  
  
Данный способ немного лучше, чем предыдущий. Но использовать его в больших проектах также не рекомендуется. Так как уже описанные стили нельзя будет использовать повторно(только копирование на другую страницу).  
  
  
3. **Связывание** — весь CSS код размещается в отдельном внешнем файле, который подключается к web документу с помощью элемента Link в шапке этого документа  
  
Самый лучший способ добавления стилей на страницы.  
![css таблицы](/img/4610390c-75ad-4529-90e7-2c3cf14d09e2.png)  
  
![style css](/img/1e882f24-3889-444e-b393-396c72627022.png)  
Несколько аргументов в пользу использования именно этого способа:  
1) Появляется возможность использовать стили на разных страницах при минимальных затратах. Для этого необходимо только подключить существующий файл .css к странице.  
2) Все стили хранятся в одном месте. Позволяет отслеживать существующие стили.  Легко находить их.  
3) Появляется легкий способ сменить полностью дизайн сайта. Всего лишь заменив файл со стилями на новый.(Найти frameworks которые помогают это делать)  
  
**4\. Импорт**Данные способ есть комбинация _связывания_ и _встраивания._ Для этого используется тег **style**. Тег должен располагаться внутри тега **head**.  
Пример,  
<head>  
<style>   @import "/style/main.css"   @import "/style/palm.css" </style>  
</head>  
  
**Учтите, что конструкция @import должна быть первой в таблице стилей. В противном случае, многие браузеры её просто проигнорируют.**  
  
При импорте файла css можно дополнительно указать для какого типа носителя ([синтаксис](http://htmlbook.ru/css/import)) будет предназначен стиль. Тип носителя указывается через пробел после пути к файлу.  
  
  
Типы носителей и их описание

Тип

Описание

all

Все типы. Это значение используется по умолчанию.

aural

Речевые синтезаторы, а также программы для воспроизведения текста вслух. Сюда, например, можно отнести речевые браузеры.

braille

Устройства, основанные на системе Брайля, которые предназначены для слепых людей.

handheld

Наладонные компьютеры и аналогичные им аппараты.

print

Печатающие устройства вроде принтера.

projection

Проектор.

screen

Экран монитора.

tv

Телевизор.

**  
Заключение**Не рекомендуется использовать несколько типов подключения стилей одновременно. Так как возникают дополнительные сложности на рефакторинг кода, поиск ошибок, доработка стилей итд. Если все же этого не избежать необходимо помнить о приоритетах применения стилей из различных источников.  
  
**Источники:**[http://ktonanovenkogo.ru/html/uroki-css/css-tablicy-kaskadnyx-stilej-chto-eto-takoe-style-link-yazyk-css-html.html](http://ktonanovenkogo.ru/html/uroki-css/css-tablicy-kaskadnyx-stilej-chto-eto-takoe-style-link-yazyk-css-html.html)[http://htmlbook.ru/css/import](http://htmlbook.ru/css/import)