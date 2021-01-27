---
title: "content"
name: content
author: ezhkov_d
co-authors:
designers:
contributors: skorobaeus
summary:
  - content
  - псевдоэлемент
---

## Кратко

Когда задано свойство `content`, то элемент заменяется на значение этого свойства. В качестве значения могут быть переданы различные типы: изображение, градиент или текст.

## Пример

```css
a::after {
  content: "👉";
  margin-right: 5px;
}
```

## Как пишется

```css
/* Изображение в качестве содержимого */
/* Может применяться к любому элементу */
content: url("http://www.example.com/test.png");

/* Все значения ниже могут применяться ТОЛЬКО к псевдоэлементам ::before и ::after */

/* Строка текста */
content: "prefix";

/* Значения счётчиков с использованием функций counter() и counters() */
content: counter(chapter_counter);
content: counters(section_counter, ".");

/* Значения HTML-атрибутов с использованием функции attr() */
content: attr(value string);

/* Ключевые слова, зависящие от языка страницы и положения в тексте */
content: open-quote;
content: close-quote;
content: no-open-quote;
content: no-close-quote;

/* Использование нескольких значений одновременно.
  Исключение — ключевые слова normal и none */
content: open-quote counter(chapter_counter);

/* Ключевые слова, которые нельзя комбинировать с другими значениями */
content: normal;
content: none;

/* Глобальные значения */
content: inherit;
content: initial;
content: unset;
```

## Как это понять

Чаще всего свойство `content` применяется к псевдоэлементам [::before](/css/doka/before/) и [::after](/css/doka/after/) . В зависимости от значения свойства псевдоэлемент принимает тот или иной вид:

- Если значением является просто строка, то она подставляется на место псевдоэлемента. Как правило, это до или после текстового содержимого тега.
- Есть несколько зарезервированных слов, которые также можно указывать в качестве значения. Используются они как совместно со свойством [quotes](/css/doka/quotes/) , так и в автоматическом режиме:

  — `open-quote` обозначает **открывающую** кавычку цитаты для текущего языка. Например, для русского это будет открывающая «ёлочка» (`«`);

  — `close-quote` обозначает **закрывающую** кавычку цитаты для текущего языка. Например, для русского это будет закрывающая «ёлочка» (`»`);

  ### HTML

  ```html
  <blockquote>
    Вспомните, как говорили мушкетёры: <q>Один за всех, все за одного!</q>
  </blockquote>
  ```

  ### CSS

  ```css
  blockquote {
    quotes: "«" "»" "„" "”";
  }

  blockquote::before {
    content: open-quote;
  }

  blockquote::after {
    content: close-quote;
  }
  ```

  ### Результат

  ```
  «Вспомните, как говорили мушкетёры: „Один за всех, все за одного!”»
  ```

  — `no-open-quote` и `no-close-quote` используются, когда не нужно отображать кавычки, но при этом продолжать увеличивать уровень вложенности.

- Если значением является результат выполнения функций `counter()` или `counters()`, то псевдоэлемент будет содержать вычисленное значение счётчика в текущий момент. Эти функции работают совместно со свойствами `counter-reset` и `counter-increment`
- Очень интересным значением является результат выполнения функции `attr()`. С помощью неё можно вывести в псевдоэлемент значение любого атрибута тега:

### HTML

```html
<p>
  Ваш рейтинг: <span data-tip="Вычисляется на основе активности">212</a>
</p>
```

### CSS

```css
[data-tip] {
  position: relative;
  cursor: help;
}

[data-tip]:hover::after {
  opacity: 1;
  visibility: visible;
}

[data-tip]::after {
  content: attr(data-tip);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
}
```

{% demo "/content/rating", "attr", 200 %}

- Ну и конечно же разработчики спецификации позаботились о нас и сделали возможность собрать сразу несколько значений в общую строку:

### HTML

```html
<p>Вы можете пройти <a href="https://google.com">по ссылке</a></p>
```

### CSS

```css
@media print {
  a[href]::after {
    content: " [" attr(href) "] ";
  }
}
```

### Результат

Вы можете пройти по ссылке [https://google.com] /_ Так выведется на печать _/

- Значением свойства `content` может быть ссылка `url(...)` на изображение. В этом случае содержимое элемента заменяется на это изображение. Нужно помнить о том, что при таком способе мы не можем управлять размером изображения.

### HTML

```html
<div class="replaced" data-alt="Mozilla logo">Mozilla</div>
```

### CSS

```css
.replaced {
  content: url("https://mdn.mozillademos.org/files/12668/MDN.svg");
}

#replaced::after {
  /* не будет отображаться, если замена элемента поддерживается */
  content: " (" attr(data-alt) ")";
}
```

### Результат

![Пример свойства content со значением url](/assets/images/posts/content/MDN.svg)

## Подсказки

💡 Если мы используем `url()` в качестве значения свойства `content` для тега, то псевдоэлементов у такого тега не будет

## В работе

🛠 Свойство `content` со значением `counter()` активно применяется в случаях, когда нужно расставить автоматическую нумерацию элементов, не относящихся к спискам:

### HTML

```html
<section>
  <h2>Внутренний механизм</h2>
  <p>Механизм счётчика состоит из:</p>
  <ul>
    <li>кнопки;</li>
    <li>пронумерованных кругов;</li>
    <li>колеса прокрутки;</li>
  </ul>
</section>

<section>
  <h2>Принцип действия</h2>
  <p>Принцип действия..</p>
</section>

<section>
  <h2>См. также</h2>
  <ul>
    <li>Механический счётчик</li>
    <li>Электронный счетчик импульсов</li>
  </ul>
</section>
```

### CSS

```css
body {
  counter-reset: cnt;
}

section {
  counter-increment: cnt;
  position: relative;
}

section h2::before {
  content: counter(cnt);
  position: absolute;
  left: -45px;
  top: -2px;
}
```

{% demo "/content/counter", "Кастомный счётчик", 530 %}

🛠 ...или красиво оформить нумерованный перечень

### HTML

```html
<h2>Наши преимущества:</h2>
<ul class="benefits">
  <li class="benefits-item">Низкие цены</li>
  <li class="benefits-item">Большая база поставщиков</li>
  <li class="benefits-item">Быстрая доставка</li>
</ul>
```

### CSS

```css
.benefits {
  counter-reset: benefits;
}

.benefits-item {
  counter-increment: benefits;
}

.benefits-item::before {
  content: counter(benefits);
  position: absolute;
  font-size: 190px;
  font-weight: bold;
  left: 0;
  top: -0.35em;
  opacity: 0.5;
  color: #1A5AD7;
}
```

{% demo "/content/list", "Нумерованный перечень", 470 %}

{% include "authors/ezhkov_d/author.njk" %}
