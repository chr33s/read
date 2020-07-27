'use strict'

const { parse } = require('@postlight/mercury-parser')
const Parser = require('rss-parser')
const fs = require('fs')

const source = require('./docs/data/source.json')
const cache = require('./docs/data/cache.json')

const parser = new Parser()

const main = async () => {
  const data = await Promise.all(source.map(async (s) => {
    try {
      const rss = await parser.parseURL(s)

      return Promise.all(rss.items.map(async (item) => {
        const d = {
          date: new Date(item.pubDate || Date.now()).toJSON(),
          title: item.title.replace(/^[\n\s]+/g, '').replace(/\s\s+/g, ' '),
          url: item.link,
        }

        try {
          const p = await parse(item.link)
          d.content = p.excerpt
        } catch(e) {}

        return d
      }))
    } catch (e) {
      console.log(s, e)
    }
  }))

  data.push(cache)

  const formatted = [].concat.apply([], data) // flatten array
    .filter(Boolean) // not null
    .filter((v) => new Date(v.date) > new Date().setDate(new Date().getDate()-30)) // older 30 days
    .filter((v, i, a) => a.map((u) => u.url).indexOf(v.url) === i) // unique
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // by date

  fs.writeFileSync(
    './docs/data/cache.json',
    JSON.stringify(formatted, null, 2),
  )
}

main()
