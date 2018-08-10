---
templateKey: blog-post
title: Генерация документации для JavaScript
date: 2011-04-19T16:02:00.000Z
description: Генерация документации для JavaScript
tags:
- Old posts
---

  

*   JsDoc toolkit

[http://code.google.com/p/jsdoc-toolkit](http://code.google.com/p/jsdoc-toolkit/) 

Плюсы: 

1.  ядро генератора написано на javascript, следовательно для генерации доков нужна только установленная java машина
2.  достаточно хорошее описание тэгов и есть примеры работы с ними. [http://code.google.com/p/jsdoc-toolkit/w/list](http://code.google.com/p/jsdoc-toolkit/w/list)
3.  работает с русскими комментариями

Минусы:

1.  Возможно невозможно генерация доков для классов, находящихся в анонимной функции. Например:

include('class1.js', 'class2.js', function() {

       /**

       \* Вот для этого класса не получится сгенерить доки

       \* @class 

       \* @constructor

       */

       var MyClass = function() {};

});

  

*   YUI Doc

[http://developer.yahoo.com/yui/yuidoc/](http://developer.yahoo.com/yui/yuidoc/)

[http://www.slideshare.net/ysaw/beautiful-documentation-with-yui-doc](http://www.slideshare.net/ysaw/beautiful-documentation-with-yui-doc)

Генератор от Yahoo. Последняя версия вышла _12/05/2008 и до сих пор находится с пометкой beta._

Плюсы:

1.  Нет проблемы с классами внутри анонимных функций. см. выше
2.  Генерится красивый набор html-страниц. По оформления более удобный по сравнению с JsDoc

Минусы:

1.  Для запуска необходим python 2.* и дополнительные либы к нему.
    
    *   [setuptools](http://peak.telecommunity.com/DevCenter/setuptools): distribution/packaging tools
    *   [Pygments](http://pygments.org/): Python syntax highlighter
    *   [SimpleJSON](http://svn.red-bean.com/bob/simplejson/tags/simplejson-1.3/docs/index.html): JSON toolkit for Python
    *   [Cheetah](http://www.cheetahtemplate.org/): Python templating engine
    
    2\. Не поддерживает комментарии на русском. Вылетает при выполнении при генерации исходников с подсветкой синтаксиса. Хотя есть решение. Я покапался в исходникам python. Все дело в том, что файлы читаются без учета кодировки.
    
    Чтобы скрипт хоть как-то отработал, нужно в файле yuidoc_highlight.py в строчке 57 написать так out.writelines(highlighted.encode("utf-8")), если конечно файл с js скриптом в utf-8 кодировке. Я не спец в python, так что возможно есть другой выход.  
      
    \+ исправленная версия, с возможностью генерить доки с русскими комментариями  
    [http://narod.yandex.ru/disk/11862647001/yuidoc.rar](http://narod.yandex.ru/disk/11862647001/yuidoc.rar)