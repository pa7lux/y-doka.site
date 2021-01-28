---
title: "[attr]"
name: attribute-selector
author: ezhkov_d
co-authors:
designers:
contributors:
tags:
  - sprint-1
summary:
  - селектор
  - атрибут
---

## Кратко

Селектор по атрибуту находит элемент на странице по значению либо по наличию атрибута.

## Пример

```html
<blockquote cite="А. С. Пушкин">
  Октябрь уж наступил — уж роща отряхает <br />
  Последние листы с нагих своих ветвей;
</blockquote>
```

Селектор ниже _найдёт_ все цитаты (`blockquote`) с атрибутом `cite`:

```css
blockquote[cite] {
  background-color: lightgreen;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="mdrJNzP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="attribute selector (div[attr] {})">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/mdrJNzP">
  attribute selector (div[attr] {})</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Как пишется

Теги `<a>`, у которых есть атрибут `title`

```css
a[title] {
  font-size: 2em;
}
```

Теги `<a>`, у которых атрибут `href` в точности равен **https://example.org**

```css
a[href="https://example.org"]
{
  background-color: blue;
}
```

Теги `<a>`, у которых в атрибут `href` входит подстрока **example** Этот селектор, например, применится для тега `<a href="https://example.org">Ссылка</a>`

```css
a[href*="example"] {
  font-size: 2em;
}
```

Теги `<a>`, у которых атрибут `href` оканчивается на **.ru**

```css
a[href$=".ru"] {
  font-style: italic;
}
```

Теги `<a>`, у которых атрибут `class` содержит слово **logo**

```css
a[class~="logo"] {
  padding: 2px;
}
```

## Как это понять

Этот тип селектора помогает нам стилизовать элементы, опираясь либо на наличие самого атрибута, либо на его значение. Мы можем стилизовать элементы, используя следующие варианты записи селектора:

### `[attr]`

Селектор выберет все элементы, у которых присуствует атрибут `attr`.

```html
<button disabled>OK</button>
```

```css
[disabled] {
  opacity: 0.5;
}
```

### `[attr=value]` или `[attr="value"]`

Селектор выберет все элементы, атрибут `attr` которых в точности равен `value`.

::: callout ℹ️

Здесь и далее: Если в значении атрибута есть пробелы или знаки, отличные от цифр и букв, то значение нужно указывать в кавычках. В остальных случаях кавычки не обязательны.

:::

```html
<a href="#">Пустая ссылка</a> <a href="#one">Эта ссылка не стилизуется</a>
```

```css
[href="#"] {
  color: red;
}
```

### `[attr~=value]`

Селектор выбирает все элементы, значение атрибута `attr` которых — это перечень слов, разделенных пробелом, и среди этих слов есть такое, чьё значение равно `value`.

```html
<blockquote cite="Александр Сергеевич Пушкин">...</blockquote>
<blockquote cite="Лев Николаевич Толстой ">...</blockquote>
```

```css
[cite~="Пушкин"] {
  border: 1px solid green;
}
```

### `[attr|=value]`

Селектор выберет все элементы, значение атрибута `attr` которых либо в точности равно `value`, либо начинается с `value`, за которым следует символ дефиса `-` (U+002D). Подобный вариант селектора чаще всего используется для выбора по коду языка (например `en-US` или `en-GB`).

```html
<div lang="en-us en-gb en-au en-nz">Hello World!</div>
<div lang="zh-CN">世界您好！</div>
<div lang="zh-TW">世界您好！</div>
```

```css
[lang|="en"] {
  /* Выберет первый div */
  color: blue;
}

[lang|="zh"] {
  /* Выберет два других div */
  color: red;
}
```

### `[attr^=value]`

Селектор выберет все элементы, значение атрибута `attr` которых **начинается** с `value`.

```html
<a href="https://secure.com/">Ссылка по протоколу HTTPS</a>
<a href="http://secure.com/">Ссылка по протоколу HTTP</a>
```

У ссылок по протоколу HTTPS справа отображается замок

```css
[href^="https"]::after {
  content: "🔐";
  margin-left: 3px;
}
```

### `[attr$=value]`

Селектор выберет все элементы, значение атрибута `attr` которых **оканчивается** на `value`.

```html
<a href="https://apple.com/">Apple US</a>
<a href="https://apple.com/ru">Apple Russia</a>
<a href="https://apple.com/it">Apple Italy</a>
```

```css
a::after {
  content: "🇺🇸";
}
a[href$="/ru"]::after {
  content: "🇷🇺";
}
a[href$="/it"]::after {
  content: "🇮🇹";
}
```

### `[attr*=value]`

Селектор выберет все элементы атрибут `attr` которых содержит в себе значение `value`.

```html
<img src="/img/myadvertisingbanner.png" />
<img src="/img/other-advert-banner.png" />
<img src="/img/Advert-image.png" />
```

Спрячет две первых рекламных картинки. Оба изображения в атрибуте src содержат подстроку advert.

```css
img[src*="advert"] {
  display: none;
}
```

::: callout ❗️

Третья картинка не спрячется, потому что не совпал регистр символов. `Advert` и `advert` — это разные значения с точки зрения браузера

:::

### `[attr operator value i]`

Если добавить в скобки после значения атрибута `i` или `I`, то браузер будет игнорировать регистр сиволов.

```html
<img src="/img/myadvertisingbanner.png" />
<img src="/img/other-advert-banner.png" />
<img src="/img/Advert-image.png" />
```

Теперь будут спрятаны все три картинки

```css
img[src*="advert" i] {
  display: none;
}
```

## В работе

При помощи селектора по атрибуту круто стилизовать ссылки, основываясь на значении атрибута `href`. Можно визуально разделять ссылки, ведущие на соседние страницы сайта, и ссылки, ведущие на другие сайты:

```html
<a href="http://mysite.ru/about">О нас</a>
<a href="http://mysite.ru/delivery">Доставка</a>
<a href="http://mysite.ru/contacts">Контакты</a>
<a href="http://medium.com/mysite-blog">Мы на Medium</a>
```

```css
[href^="http"]::after {
  content: "↗️"; /* Все ссылки с иконкой стрелочки */
}

[href*="/mysite.ru/"]::after {
  display: none; /* внутренние ссылки без иконок */
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="qBaaYJX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="attribute selector (div[attr] {})">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/qBaaYJX">
  attribute selector (div[attr] {})</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

{% include "authors/ezhkov_d/author.njk" %}
