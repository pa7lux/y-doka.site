---
title: "transition"
name: transition
author: ezhkov_d
co-authors:
designers:
contributors:
tags:
  - sprint-2
summary:
  - transition
---

## Кратко

Свойство `transition` используется, когда нам нужно плавно изменить CSS-свойства между двумя состояниями элемента. Например, при наведении мышкой.

## Пример

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="vYLxgGz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transition 1">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/vYLxgGz">
  transition 1</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Подробно

Свойство `transition` комплексное. Как, например, [margin](/css/doka/margin/) или `background`. Оно включает в себя несколько подсвойств:

- `transition-property` — указываем свойство, которое хотим плавно изменить
- `transition-duration` — длительность перехода
- `transition-timing-function` — функция, описывающая скорость изменения свойства
- `transition-delay` — задержка перед началом изменения

## Как записывается

```css
/* Применить к одному свойству */

/* Порядок записи: имя свойства | длительность */
transition: margin-left 4s;

/* Порядок записи: имя свойства | длительность | задержка */
transition: margin-left 4s 1s;

/* Порядок записи: имя свойства | длительность | временная функция | задержка */
transition: margin-left 4s ease-in-out 1s;

/* Применить к двум свойствам */
transition: margin-left 4s, color 1s;

/* Применить ко всем свойствам, которые будут меняться */
transition: all 0.5s ease-out;
```

## Как это понять

Предположим, у нас есть кнопка, у которой мы хотим изменить фон при наведении мышкой.

```html
<button class="button">Кнопка</button>
```

Тогда можно сказать, что у кнопки есть два состояния:

1. Базовое состояние, когда мышка не над кнопкой
2. Состояние при наведении курсора мыши (hover-состояние)

Стили для двух этих состояний могут быть записаны в CSS вот так:

```css
/* Стили для базового состояния */
.button {
  padding: 5px 10px;
  background-color: navy;
}

/* Стили для hover-состояния */
.button:hover {
  background-color: red;
}
```

Чтобы при наведении фон кнопки изменялся не скачком, а плавно, мы используем свойство `transition` для плавного изменения цвета фона.

```css
/* Стили для базового состояния */
.button {
  padding: 5px 10px;
  transition: background-color 0.4s;
  background-color: navy;
}

/* Стили для hover-состояния */
.button:hover {
  background-color: red;
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="wvMJJBW" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transition 2">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/wvMJJBW">
  transition 2</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Если мы хотим плавно изменить два и более свойств, нужно просто перечислить их через запятую:

```css
/* Стили для базового состояния */
.button {
  padding: 5px 10px;
  transition: background-color 0.4s, padding 0.5s;
  background-color: navy;
}

/* Стили для hover-состояния */
.button:hover {
  background-color: red;
  padding: 5px 20px;
}
```

Не забывай о том, что вместе с изменяемым свойством обязательно должна указываться длительность изменения (`.5s`)

## Подсказки

💡 Обрати внимание, что свойство `transition` мы задали в стилях для базового состояния. Таким образом, мы заранее говорим браузеру, какое свойство должно изменяться плавно.

💡 С помощью `transition` можно плавно изменять любое свойство, у которого значение записывается с помощью чисел (например, `margin`). Исключения: `visibility`, `z-index`

По возможности старайся **не использовать** слово `all` для описания перехода (`transition: all .3s`). Да, это проще на первоначальном этапе, но позже из-за этого в какой-то момент могут начать плавно изменяться свойства, которые не должны этого делать. Ну и вообще, когда браузер встречает слово `all`, он начинает перебирать каждое CSS свойство элемента в поисках необходимого. Это ненужная нагрузка.

## Особенности

💡 Вторым состоянием не обязательно должно быть состояние при наведении. Это может быть состояние `:focus`, `:active`, `:checked` или, например, появление дополнительного класса.

💡 Мы можем настроить `transition` таким образом, что при изменении состояния переход будет выполняться с одной скоростью, а при обратном изменении состояния - с другой:

```css
/* Стили для базового состояния */
.button {
  padding: 5px 10px;
  transition: padding 0.3s;
}

/* Стили для hover-состояния */
.button:hover {
  padding: 5px 20px;
  transition: padding 3s;
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="KKVWWgX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transition 3">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/KKVWWgX">
  transition 3</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Обрати внимание, в этом случае свойство `transition` задается для обоих состояний.

💡 Длительность перехода может задаваться в секундах (`0.3s`) или в миллисекундах (`300ms`). Ноль перед точкой можно не писать (`.3s`).

💡 Значение свойства `z-index` записывается числом, но его нельзя плавно изменить никаким способом

💡 Значение свойства `visibility` записывается строкой, но его в связке с `opacity` можно плавно изменять при помощи `transition`.

💡 Кроме использования для изменения внешнего вида элемента, `transition` прекрасно подходит для решения задач с появлением элементов. Например при реализации тултипов или всплывающих меню:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="yLeMbjm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transition 4">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/yLeMbjm">
  transition 4</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

**Обрати внимание**, что мы прописали `visibility` как одно из свойств, которое нужно плавно изменить. Это работает в связке с `opacity` и обеспечивает возможность плавного появления/скрытия элемента:

```css
.tooltip {
  transition: opacity 0.4s, visibility 0.4s;
}
```

Если использовать только `opacity`, то элемент станет невидимым, но будет доступен для взаимодействия с мышкой и клавиатурой.

Если использовать только `visibility`, то скрытие/появление не будет плавным.

{% include "authors/ezhkov_d/author.njk" %}
