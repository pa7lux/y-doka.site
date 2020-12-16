const { DateTime } = require("luxon")

module.exports = {
  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format))
  },

  dateToISO: function (date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    })
  },

  obfuscate: function (str) {
    const chars = []
    for (var i = str.length - 1; i >= 0; i--) {
      chars.unshift(["&#", str[i].charCodeAt(), ";"].join(""))
    }
    return chars.join("")
  },

  filterPeople: function (contributorsList, filterList) {
    return contributorsList
      .filter((contributor) => {
        const filterListNormalized = [].concat(filterList)

        return filterListNormalized.includes(contributor.fileSlug)
      })
      .map((contributor) => {
        return contributor.data
      })
  },

  dropFolder: function (path, folderName) {
    const regexp = new RegExp(`\/${folderName}`)
    return path.replace(regexp, "")
  },
}
