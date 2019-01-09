---
templateKey: blog-post
title: Антипаттерны CSS
date: 2012-04-06T08:30:00.000Z
description: Антипаттерны CSS
tags:
- Old posts
---

Небольшой сборник советов при работе с css.

### 1\. Неточные имена классов

.red { color: red; font-style: italic }

  

Не стоит называть класс по визуальному отображению(цвет, картинка, итд). При смене дизайна сайта такие правила придется удалить или переименовать (изменится цвет элементов). Если же использовать логические имена, то достаточно будет изменить css правило на новое. Имя класса должно быть логичным и понятным. Например, класс _red_ используется скорее всего для выделения содержимого. В этом случае лучше назвать класс _highlight_.  
  

### 2\. Невалидный CSS файл

При каждом изменении css файла прогоняйте его через валидатор. Это поможет избежать долгих поисков багов в верстке. 

  

Валидатор можно встроить в среду разработки(Eclipse, IntelliJ Idea, NetBeans ...) или использовать w3c валидатор ([ссылка](http://jigsaw.w3.org/css-validator/#validate_by_input)).

### 3\. Избыточные правила

При возможности старайтесь сократить css атрибуты.

  

Плохо:

background: #2175BE; background-image: url(/img/../images/bottomshadownav.png); background-position: bottom; background-repeat: repeat-x;

  

Хорошо:  

   background: #2175BE url(/img/../images/bottomshadownav.png) repeat-x bottom;  

### 4\. Чрезмерно специфичные классы

Старайтесь создавать классы для одной операции. Это не значит, что необходимо создавать классы с одним css атрибутом. Необходимо разделять классы выполняющие разные задачи. Это поможет сделать ваш код более читаемым и понятным.

  

До:

.slider { height: 27px; float: left; }

После:  

.slider { height: 27px; } .left { float: left; }

### 5\. Кросс-браузерность

Не стоит добавлять правила специфичные для определенного браузера в главный css файл. Размещайте такие правила в отдельном файле. Это упростит главный файл стилей и позволит динамически подключать css для определенных браузеров. Также это позволит легко исключить ненужные правила при отказе от поддержки браузера. 

  

Пишите комментарии при добавлении правила для определенного браузера.

  

.decile img { _margin: 0px /* IE 6 Hack */

}

### 6\. Повторное использование 

Старайтесь обобщить (свести к одному, выделить общее) правила. Таким образом исчезнет дублирование правил.

  

До:  

.comparator a { margin-right: 3px; padding: 3px 13px 3px 13px;

} .ambition a { padding: 3px 13px 3px 13px; margin-right: 3px

}

После:  

a.link { padding: 3px 10px 3px 10px; margin-right: 3px

}

### 7\. Не используемые классы

Периодически проводите очистку кода от ненужных и не используемых правил. Лучше это выполнять автоматически с помощью плагинов или отдельных утилит.

### 8\. Code style

Используйте утилиты и плагины для поддержки кода в определенном виде. Такие плагины всегда легко настраиваются под ваши требования code style.

### 9\. Используйте frameworks

Если ваши стили имеют очень сложную структуру, попробуйте воспользоваться одним из css framework'ов. Например, [xCSS](http://xcss.antpaw.org/), [Compass](http://compass-style.org/). 

### 10\. Не пользуйтесь атрибутом !important

При его использовании становится неочевидным поведение правил, особенно если у вас сложная структура стилей.

#### Источники:

[http://markdaggett.com/blog/2011/12/04/css-anti-patterns/](http://markdaggett.com/blog/2011/12/04/css-anti-patterns/)

  

Дополнительно изучить:

[http://www.onlinetools.org/articles/cssguides.html](http://www.onlinetools.org/articles/cssguides.html)

[http://www.dezinerfolio.com/2009/02/20/css-standards-best-practices](http://www.dezinerfolio.com/2009/02/20/css-standards-best-practices)

[http://www.slideshare.net/stubbornella/5-mistakes-of-massive-css](http://www.slideshare.net/stubbornella/5-mistakes-of-massive-css)

[https://developers.google.com/speed/docs/best-practices/rendering](https://developers.google.com/speed/docs/best-practices/rendering)

[https://guide.twu.ca/CSS_Anti-patterns](https://guide.twu.ca/CSS_Anti-patterns)

  

Пишите в комментах, чтобы еще сюда добавить для всеобщего познания.