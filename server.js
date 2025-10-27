// step 1 - deine the web scraper

const cheerio = require('cheerio')

let stockTicker = 'mnra'
let type = 'history'

async function scrapeData() {
    try {
        // step a - fetch the page html
        const url = `https://finance.yahoo.com/quote/${stockTicker}/${type}?p=${stockTicker}`
        const res = await fetch(url)
        const html = await res.text()
        const $ = cheerio.load(html) // based on webscrapper, gives syntax that makes it easy to 
                                    // find what we are looking for
        const price_history = getPrices($)
        console.log(price_history)
    } catch (err) {
        console.log(err.message)

    }

    function getPrices(cher) {
        const prices = cher('td:nth-child(6)').get().map((curr_value) => {
            return cher(curr_value).text()
        })
        return prices
    }

}

// scrapeData()

// step 2 - initialize server that server up an html file the user can play with

const express = require('express')
const app = express()
const port = 8383


app.listen(port, () => (console.log(`Server has started on port: ${port}`)))



// step 3 - define api endpoints to access stock data (and call webscraper)