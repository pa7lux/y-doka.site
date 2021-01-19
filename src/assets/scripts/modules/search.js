const DEBOUNCE_DELAY = 300
const MIN_CHARACTERS = 1
const HIDDEN_CLS = "search__suggestions__hidden"
const SEARCH_FORM_ID = "js-search-form"
const SEARCH_CATEGORY_FIELD = "search_category[]"

const searchInput = document.getElementById("search")
const suggestionsContainer = document.getElementById("search-suggestions")

let isFetchingSearchIndex = false
let promise
let searchIndex
let timer
let currentFocus = -1

const buildSuggestionItem = (caption, url) => {
  let item
  if (typeof url !== "string") {
    item = document.createElement("div")
  } else {
    item = document.createElement("a")
    item.href = url
    item.setAttribute("role", "option")
  }

  item.classList.add("search__suggestions__item")
  item.innerText = caption

  return item
}

const clearSuggestionContainer = () => {
  while (suggestionsContainer.firstChild) {
    suggestionsContainer.removeChild(suggestionsContainer.firstChild)
  }
}

const hideSuggestionContainer = () => {
  suggestionsContainer.classList.add(HIDDEN_CLS)
}

const showSuggestionContainer = () => {
  suggestionsContainer.classList.remove(HIDDEN_CLS)
}

const searchIndexLogic = {
  data: undefined,
  isFetchingData: false,
  dataFetchPromise: undefined,
  init: function (onError) {
    this.isFetchingData = true
    this.dataFetchPromise = fetch("/search-data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Response has unexpected status ${response.status}: ${response.statusText}`
          )
        }
        return response.json()
      })
      .then((data) => {
        this.data = data
      })
      .catch((err) => {
        console.error(err)
        typeof onError === "function" && onError()
      })
      .finally(() => {
        this.isFetchingData = false
      })
  },

  search: async function (phrase, categories = [], count = 5) {
    if (typeof phrase === "string") {
      if (this.isFetchingData) {
        // TODO move presentation out
        suggestionsContainer.appendChild(
          buildSuggestionItem("ищем изо всех сил...")
        )
        showSuggestionContainer()
        await this.dataFetchPromise
      }

      clearSuggestionContainer()

      return this.data
        .filter(({ title, summary, tags }) => {
          if (
            categories.length &&
            categories.every((category) => !tags.includes(category))
          ) {
            return false
          }

          return title.includes(phrase) || summary.includes(phrase)
        })
        .slice(0, count)
    }
  },
}

const searchElastic = {
  init: () => {
    console.log("elastic here!")
  },
  search: async function (phrase, categories = [], count = 5) {
    const response = await fetch(
      "https://dd7a335da0044763bf4923a09b244f6e.us-central1.gcp.cloud.es.io:9243/content/_search",
      {
        method: "POST",
        mode: "cors",
        headers: {
          authorization:
            "ApiKey VVRNYjduWUJVN3VzdFJ2ZWVMeU86STNDcWEzOEJRWFM3c042clByVWtaZw==",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            multi_match: {
              query: phrase,
              fields: ["title^3", "summary^2", "text"],
            },
          },
        }),
      }
    )
    const results = await response.json()

    return results.hits.hits.map((hit) => hit._source)
  },
}

if (searchInput !== null) {
  let isFirstCall = true
  const SEARCH_SOURCES = {
    ELASTIC: searchElastic,
    INDEX: searchIndexLogic,
  }
  const searchSource = window.location.search.includes("elastic")
    ? SEARCH_SOURCES.ELASTIC
    : SEARCH_SOURCES.INDEX

  searchInput.addEventListener("keydown", async (event) => {
    if (event.code === "Tab") {
      return
    }

    if (isFirstCall) {
      searchSource.init(() => {
        searchInput.disabled = true
      })
      isFirstCall = false
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(async () => {
      const searchPhrase = event.target.value
        .toLowerCase()
        .trim()
        .replace(/\s+/gi, " ")

      if (searchPhrase && searchPhrase.length >= MIN_CHARACTERS) {
        const form = document.getElementById(SEARCH_FORM_ID)
        const searchCategory = form
          ? new FormData(form).getAll(SEARCH_CATEGORY_FIELD)
          : []

        const results = await searchSource.search(searchPhrase, searchCategory)

        clearSuggestionContainer()
        results.forEach((item) => {
          suggestionsContainer.appendChild(
            buildSuggestionItem(item.title, item.url)
          )
        })

        if (suggestionsContainer.children.length === 0) {
          suggestionsContainer.appendChild(
            buildSuggestionItem("Ничего не нашлось")
          )
        }

        showSuggestionContainer()
        let x = document.getElementById("search-suggestions")
        if (x) x = x.getElementsByTagName("a")

        if (event.key === "ArrowDown") {
          currentFocus++
          addActive(x)
        } else if (event.key === "ArrowUp") {
          currentFocus--
          addActive(x)
        } else if (event.key === "Enter" || event.keyCode === 13) {
          event.preventDefault()

          if (currentFocus > -1) {
            if (x) x[currentFocus].click()
          }
        }
      } else {
        hideSuggestionContainer()
      }
    }, DEBOUNCE_DELAY)
  })

  window.addEventListener("click", (event) => {
    if (event.target && event.target.className.indexOf("search") === 0) {
      return
    }

    hideSuggestionContainer()
  })

  searchInput.addEventListener("focus", () => {
    if (suggestionsContainer.innerText !== "") {
      showSuggestionContainer()
    }
  })

  function addActive(x) {
    if (!x) return false
    removeActive(x)
    if (currentFocus >= x.length) currentFocus = 0
    if (currentFocus < 0) currentFocus = x.length - 1
    x[currentFocus].classList.add("autocomplete-active")
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active")
    }
  }
}
