---
title: "list-style-image"
name: list-style-image
author: ezhkov_d
co-authors:
designers:
contributors: skorobaeus
summary:
  - стили списка
  - список
---

## Кратко

Свойство устанавливает картинку в качестве маркера у списка.

## Пример

```css
ul {
  list-style-image: url("https://myimages.com/media/examples/rocket.svg");
}
```

## Как пишется

```css
/* Ключевые слова */
list-style-image: none;

/* <url> в качестве значения */
list-style-image: url("starsolid.gif");

/* Глобальные значения */
list-style-image: inherit;
list-style-image: initial;
list-style-image: unset;
```

## Подсказки

💡 Размером и положением маркера нельзя управлять, поэтому он будет равен размеру картинки и выровнен по базовой линии текста. Из этой особенности следует, что картинку-маркер следует заранее подготовить, подогнав под нужный размер.

{% demo "/list-style-image/every", "Варианты list-style-image", 450 %}

💡 Это наследуемое свойство, поэтому чаще всего его задают тегу списка, чтобы все внутренние элементы унаследовали его. Но при желании каждому элементу списка `<li>` можно задать его индивидуально.

💡 Если по какой-то причине изображение не загрузится, будет показан маркер по умолчанию. Для `<ol>` это нумерация, для `<ul>` — маркер, соответствующий уровню вложенности.

💡 Согласно справочникам свойство не анимируется, но в некоторых браузерах (Chrome, Safari) есть поддержка плавной смены картинки с использованием [transition](/css/doka/transition)

```css
li {
  list-style-image: url("marker.png");
  transition: list-style-image 0.3s;
}

li:hover {
  list-style-image: url("marker_hover.png");
}
```

{% demo "/list-style-image/transition", "Анимация list-style-image", 320 %}

{% include "authors/ezhkov_d/author.njk" %}
