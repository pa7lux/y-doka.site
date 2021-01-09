const fs = require("fs")
const path = require("path")
const { Client } = require("@elastic/elasticsearch")

const updateElasticSearch = () => {
  const elastic = new Client({ node: "http://localhost:9200" })
  const file = fs.readFileSync(
    path.join(__dirname, "../dist/elasticsearch-data.json")
  )
  elastic.helpers
    .bulk({
      datasource: JSON.parse(file),
      onDocument: (doc) => ({
        index: { _index: "articles" },
      }),
      refreshOnCompletion: true,
    })
    .then((res) => console.log(res))
}

exports.handler = async function (event, context) {
  const { payload, site } = JSON.parse(event.body)

  console.log("payload", payload)
  console.log("site", site)
}
