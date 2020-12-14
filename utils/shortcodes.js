const outdent = require("outdent")
const path = require("path")

module.exports = {
  icon: function (name) {
    return `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24">
                    <use xlink:href="#icon-${name}"></use>
                </svg>`
  },
  demo: function (demoName, title = "", height = 400) {
    return outdent`
      <iframe
        src="${demoName}/index.html"
        title="${title}"
        height="${height}"
        onload="this.style.height = this.contentWindow.document.body.scrollHeight + 'px'"
        loading="lazy">
      </iframe>
    `
  },
}
