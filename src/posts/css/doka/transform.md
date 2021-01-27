---
title: "transform"
name: transform
author: ezhkov_d
co-authors:
designers:
contributors:
tags:
  - sprint-2
summary:
  - трансформация
---

## Кратко

Свойство `transform` используем, когда нам нужно применить к элементу какие-либо трансформации: искажение, поворот, смещение, масштабирование.

## Пример

```css
/* смещаем визуальное представление элемента на 120 пикселей вправо */
transform: translateX(120px);
```

## Как пишется

```css
/* Ключевые слова */
transform: none;

/* Функции в качестве значения */
transform: matrix(1, 2, 3, 4, 5, 6);
transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
transform: perspective(100px);
transform: rotate(0.25turn);
transform: rotate3d(1, 2, 3, 10deg);
transform: rotateX(10deg);
transform: rotateY(1.55rad);
transform: rotateZ(10deg);
transform: translate(12px, 50%);
transform: translate3d(12px, 50%, 3em);
transform: translateX(2em);
transform: translateY(3in);
transform: translateZ(2px);
transform: scale(2, 0.5);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleX(2);
transform: scaleY(0.5);
transform: scaleZ(0.3);
transform: skew(90deg, 120deg);
transform: skewX(10deg);
transform: skewY(0.7rad);

/* Несколько значений */
transform: translateX(10px) rotate(10deg) translateY(5px);
transform: perspective(500px) translate(10px, 0, 20px) rotateY(3deg);

/* Глобальные значения */
transform: inherit;
transform: initial;
transform: unset;
```

## Как это понять

Часто бывает необходимо каким-то образом трансформировать визуальное представление элемента (масштабировать, повернуть, переместить) и при этом никак не затронуть соседние элементы в документе. Для подобных преобразований используется свойство `transform`. В качестве значения выступают различные функции трансформации: `rotate`, `translate`, `scale`, `skew`.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="ezhkov" data-slug-hash="GRZzQBZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transform interactive">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/GRZzQBZ">
  transform interactive</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Стоит обратить особое внимание на тот факт, что трансформируемый элемент при трансформациях никак не взаимодействует с соседними элементами. Он как бы «приподнимается» над остальным содержимым. При этом он не уходит из потока документа, и остальные элементы располагаются так, как располагались до применения трансформаций.

## Подсказки

💡 Трансформировать можно только трансформируемые элементы. Звучит как «масло масляное», но на странице существуют определенные типы элементов, к которым не применима стандартная блочная модель. Нельзя трансформировать инлайновые и табличные элементы.

💡 Если среди значений есть функция `perspective()`, то она должна быть первой среди всех значений:

```css
/* Неправильно */
transform: translate(10px, 0, 20px) rotateY(3deg) perspective(500px);

/* Правильно */
transform: perspective(500px) translate(10px, 0, 20px) rotateY(3deg);
```

💡 Можно применять трансформации сразу к нескольким осям, используя сокращенные функции:

```css
transform: translateX(10px) translateY(0) translateZ(20px);

/* Можно собрать в кучку: */
transform: translate(10px, 0, 20px);
```

❗ Если свойство `transform` имеет значение, отличное от `none`, то создаётся новый контекст наложения. Это означает, что относительно этого элемента теперь будут позиционироваться все дочерние элементы, у которых `position: fixed` или `position: absolute`.

❗Чтобы трансформации вдоль оси Z работали и выглядели максимально естественно, трансформируемый элемент должен лежать в родителе, которому задано свойство `perspective`:

```css
.parent {
  perspective: 500px;
}

.child {
  transform: translateZ(100px) rotateX(25deg);
}
```

## В работе

🛠 Благодаря тому, что трансформации элемента никак не затрагивают соседей, свойство `transform` в сочетании с [transition](/css/doka/transition) активно используется для создания плавных анимаций элемента при наведении, либо при изменении состояния.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="ezhkov" data-slug-hash="qBZzorM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transform scale hover">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/qBZzorM">
  transform scale hover</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

{% include "authors/ezhkov_d/author.njk" %}
