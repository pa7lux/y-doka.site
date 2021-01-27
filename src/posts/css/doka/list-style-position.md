---
title: "list-style-position"
name: list-style-position
author: ezhkov_d
co-authors:
designers:
contributors: skorobaeus
summary:
  - list-style-position
---

## Кратко

Свойство `list-style-position` задает положение маркера списка относительно элемента списка

## Пример

```css
.inside {
  list-style-position: inside;
  list-style-type: square;
}
```

## Как пишется

```css
/* Ключевые слова */
list-style-position: inside;
list-style-position: outside;

/* Глобальные значения */
list-style-position: inherit;
list-style-position: initial;
list-style-position: unset;
```

## Как это понять

Свойство указывает, будет ли маркер являться частью содержимого в элементе списка (`inside`), либо будет находиться вне элемента (`outside`)

{% demo "/list-style-position/", "Положение маркеров", 350 %}

## Подсказки

💡 По умолчанию свойство имеет значение `outside`

💡 Это свойство применяется к элементам, у которых свойство `display` имеет значение `list-item`. Как правило, это элементы списка `<li>`. Но так как это свойство наследуется, то обычно его задают самому списку `<ul>`, чтобы оно применилось ко всем элементам списка сразу.

## В работе

🛠 В реальных проектах свойство используется очень редко, потому что работает только с "родными" маркерами списков. Дизайнеры в макетах повсеместно рисуют стилизованные маркеры, которые сверстать можно только с использованием псевдоэлементов [::before](/css/doka/before/).

{% include "authors/ezhkov_d/author.njk" %}
