const { Client } = require("@elastic/elasticsearch")
const fetch = require("node-fetch")

const updateElasticIndex = async (url, apiKey) => {
  const elastic = new Client({
    auth: { apiKey },
    node: url,
  })
  const contentAlias = "content"
  const rolloverConditions = {
    conditions: {
      max_age: "30d",
    },
  }

  try {
    await elastic.indices.rollover({
      alias: contentAlias,
      body: rolloverConditions,
    })
    const response = await fetch("https://y-doka.site/elasticsearch-data.json")
    if (response.ok) {
      const data = await response.json()

      const res = await elastic.helpers.bulk({
        datasource: data,
        onDocument: (doc) => ({
          index: { _index: "content", _id: doc.id },
        }),
        refreshOnCompletion: true,
      })
      console.log(res)
    } else {
      console.error(
        `Cannot get documents to add. Response status ${res.status}`
      )
    }
  } catch (e) {
    console.log(e.meta.body.error)
    console.log(e.meta.meta.request)
  }
}

exports.handler = async function (event) {
  const { payload } = JSON.parse(event.body)

  if (payload) {
    const { context } = payload
    const { ELASTIC_WRITE_KEY: apiKey, ELASTIC_URL: elasticUrl } = process.env
    if (context === "production") {
      if (!elasticUrl || !apiKey) {
        console.error(
          "Environment variables for ElasticSearch are not set. Both ELASTIC_URL and ELASTIC_WRITE_KEY must be set"
        )
        return
      }

      await updateElasticIndex(elasticUrl, apiKey)
    } else {
      console.log(
        "Skip update of search data. The search data is updated only for production builds"
      )
    }
  }
}
