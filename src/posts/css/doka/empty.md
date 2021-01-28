---
title: ":empty"
name: empty
author: ezhkov_d
co-authors:
designers:
contributors:
summary:
  - псевдокласс
  - пусто
---

## Кратко

Псевдокласс `:empty` используется для выбора пустых элементов. Пустыми считаются элементы без потомков, текста или псевдоэлементов внутри.

## Пример

```html
<div class="search-form">
  <form action="">...</form>
</div>
<div class="search-results"></div>
```

```css
.search-results {
  margin-top: 20px;
  border-top: 1px solid gray;
}

.search-results:empty {
  display: none;
}
```

В примере выше результаты поиска будут вставлены в блок с классом `search-results`. Ему задан верхний отступ и рамка. 
Если результатов нет, то блок останется пустым и будет скрыт. Не будет ни рамки, ни отступа.
Если результатов поиска нет, то блок с результатами отображаться не будет.

Без использования псевдокласса `:empty` у нас на экране будет пустой элемент с верхним отступом и границей

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="poNzKJr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title=":empty">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/poNzKJr">
  :empty</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Как это понять

Потомками элемента могут являться как другие теги, так и текстовый контент, включая пробелы. А вот HTML-комментарии не будут являться потомками.

Например, у подобных элементов есть потомки:

```html
<div> </div>

<div>
  <!-- test -->
</div>

<div>
</div>
```

В первом случае потомком является пробел, во втором и третьем - символы переноса строк.

А вот такие элементы браузер будет считать пустыми:

```html
<div></div>

<div><!-- test --></div>
```

В первом случае внутри тега нет ничего, что могло бы считаться потомком. Во втором случае внутри тега присутствует только комментарий, который также не считается за потомка.

## В работе

В реальных проектах этот селектор сильно помогает, когда нет возможности управлять элементом, но точно знаешь, что иногда он может быть пустым. Использование псевдокласса `:empty` позволяет убрать лишние отступы или границы, которые могут присутствовать у пустого элемента.
