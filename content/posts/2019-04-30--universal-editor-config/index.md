---
title: Universal .editorconfig
description: >
  EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
category: "HowTo"
cover: editorconfig-800x420.jpg
author: Ivan Mashintsev
---
![EditorConfig](editorconfig-800x420.jpg)

## What is EditorConfig?

[EditorConfig](http://editorconfig.org) helps developers define and maintain consistent coding styles between different editors and IDEs. 
The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable 
editors to read the file format and adhere to defined styles. 
EditorConfig files are easily readable and they work nicely with version control systems.

```editorconfig

root = true

[*]
charset = utf-8
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 80

[*.{groovy,java,kt}]
indent_style = space
indent_size = 4

[*.go]
indent_style = tab
indent_size = 4

[*.py]
indent_style = space
indent_size = 4

[*.{js,jsx}]
indent_size = 2
indent_style = space

[*.xml]
indent_style = space
indent_size = 4

[*.html]
indent_size = 2

[*.{yml,yaml,json}]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab
indent_size = 4

[**.min.js]
indent_style = ignore
insert_final_newline = ignore

[*.bat]
indent_style = tab

[*.md]
max_line_length = 0
trim_trailing_whitespace = false

[COMMIT_EDITMSG]
max_line_length = 0

```
