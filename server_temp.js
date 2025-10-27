// NOTE: Before running this script, make sure you have Puppeteer installed.
// You can install Puppeteer using the following command:
// npm install puppeteer

// step 1 - deine the web scraper
// Import Puppeteer module
const puppeteer = require('puppeteer')

// let stockTicker = 'PYPL'
let stockTicker = 'MNRA.TA'
let type = 'history'

// Define an asynchronous function that scrapes the specified URL
async function scrapeData(url) {
    if (!url) { return }
    
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: true })

    // Open a new page in the browser
    const page = await browser.newPage()

    // Navigate to the desired URL
    await page.goto(url)

    // Wait for the table's 6th column to load on the page (this ensures we wait for data to appear)
    await page.waitForSelector('td:nth-child(6)')

    // Extract the text content of all elements that match the selector 'td:nth-child(6)'
    const data = await page.evaluate(() => {
        // Select all elements that match the 'td:nth-child(6)' selector
        const elements = document.querySelectorAll('td:nth-child(6)')
        // Map over the elements and extract their text content into an array
        return Array.from(elements).map(element => element.textContent.trim())
    })

    // Close the browser instance
    await browser.close()

    // Return the extracted data array
    return data
}

// Asynchronous function to invoke the scrapeData function and handle the result
; (async () => {
    try {
        // Call the scrapeData function with the desired URL
        const data = await scrapeData(`https://finance.yahoo.com/quote/${stockTicker}/${type}/`)

        // Log the returned data to the console
        console.log(data)
    } catch (error) {
        // Handle any errors that may occur during the scraping process
        console.error('Error:', error)
    }
})()

module.exports = { scrapeData }

// step 2 - initialize server that server up an html file the user can play with


const express = require('express')
const app = express()
const port = 8383

// middleware
app.use(express.json())
app.use(require('cors')())
app.use(express.static('public'))


// step 3 - define api endpoints to access stock data (and call webscraper)

app.post('/api', async (req, res) => {
    const { stock_ticker: ticker } = req.body
    console.log('Received ticker:', ticker)

    try {
        const url = `https://finance.yahoo.com/quote/${ticker}/history?p=${ticker}`
        const prices = await scrapeData(url)
        res.status(200).send({ prices })
    } catch (error) {
        console.error('Scrape error:', error)
        res.status(500).send({ error: error.message })
    }
})


app.listen(port, () => (console.log(`Server has started on port: ${port}`)))