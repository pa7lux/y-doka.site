"use strict"

const types = [
  {
    type: "circle",
    title: "маркер в виде кружка",
  },
  {
    type: "disc",
    title: "маркер в виде точки",
  },
  {
    type: "square",
    title: "маркер в виде квадрата",
  },
  {
    type: "armenian",
    title: "традиционная армянская нумерация",
  },
  {
    type: "decimal",
    title: "арабские числа (1, 2, 3, 4, …)",
  },
  {
    type: "decimal-leading-zero",
    title:
      "арабские числа с нулем впереди для цифр меньше десяти (01, 02, 03,…)",
  },
  {
    type: "georgian",
    title: "традиционная грузинская нумерация",
  },
  {
    type: "lower-greek",
    title: "строчные греческие буквы (α, β, γ, δ, …)",
  },
  {
    type: "lower-alpha",
    title: "строчные латинские буквы (a, b, c, d, …)",
  },
  {
    type: "lower-latin",
    title: "это значение аналогично lower-alpha",
  },
  {
    type: "upper-alpha",
    title: "заглавные латинские буквы (A, B, C, D, …)",
  },
  {
    type: "upper-latin",
    title: "это значение аналогично upper-alpha",
  },
  {
    type: "lower-roman",
    title: "римские числа в нижнем регистре (i, ii, iii, iv, v, …)",
  },
  {
    type: "upper-roman",
    title: "римские числа в верхнем регистре (I, II, III, IV, …)",
  },
  {
    type: "disclosure-open",
    title: "открытый тогглер",
  },
  {
    type: "disclosure-closed",
    title: "закрытый тогглер",
  },
  {
    type: "none",
    title: "отменяет маркеры для списка",
  },
  {
    type: '"🔥"',
    title:
      "кастомный маркер — можно задать любой символ или текст (в кавычках)",
  },
]

const List = () => {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) setIndex((i) => (++i < types.length ? i : 0))
    }, 1200)
    return () => clearInterval(interval)
  }, [paused])
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
    },
    /*#__PURE__*/ React.createElement(
      "pre",
      null,
      /*#__PURE__*/ React.createElement(
        "code",
        null,
        "ul ",
        `{ list-style-type: ${types[index].type} }`
      )
    ),
    /*#__PURE__*/ React.createElement(
      "ul",
      {
        class: "list",
        style: {
          listStyleType: types[index].type,
        },
      },
      types.map(({ type, title }, i) =>
        /*#__PURE__*/ React.createElement(
          "li",
          {
            className: `list__item ${i === index && " list__item_active"}`,
            onMouseEnter: () => setIndex(i),
          },
          /*#__PURE__*/ React.createElement("code", null, type),
          " ",
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "list__title",
            },
            title
          ),
          ";"
        )
      )
    )
  )
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(List, null),
  document.getElementById("root")
)
