# Stocks_data_api 

A web-based stock data scraper and API server using **Node.js**, **Express**, and **Puppeteer**.  
Users can enter a stock ticker in the browser and fetch historical stock prices from Yahoo Finance.

---

## Features

- Scrape stock historical data using Puppeteer.  
- Serve a web interface (`index.html`) to enter tickers and view results.  
- API endpoint `/api` for programmatic access.  
- Runs entirely locally with Node.js.

---

## Requirements

- Node.js (v16 or higher recommended)  
- NPM (Node Package Manager)  

> All dependencies are already included in `node_modules/`, so you **do not need to run `npm install`**.

---

## Installation / Setup

1. **Clone the repository**:

```bash
git clone https://github.com/YOUR_USERNAME/Stocks_data_api.git
cd Stocks_data_api
```

2. **Start the server**:

- To run the server script (server_temp.js):

```bash
npm run dev
```
- Or you can run the script directly:

```bash
npm run start2
```
3. **Open the web interface**:

- Open public/index.html in your browser through a live server.

- Enter a stock ticker (e.g., AAPL, MNRA.TA) and click Search.

- The historical stock prices will appear below.

---

## Project Structure
```bash
Stocks_data_api/
│
├─ node_modules/        # All required Node.js packages
├─ public/index.html    # Web interface for users
├─ package.json         # Project metadata and dependencies
├─ package-lock.json    # Dependency lock file
├─ server_temp.js       # Temporary server and web scraper
└─ README.md            # This file
```

---

# Notes
- The scraper uses Puppeteer, which may download a Chromium browser on first run if node_modules isn’t included.

- API endpoint /api accepts POST requests with JSON { "stock_ticker": "TICKER" }.

- Ensure you have a stable internet connection for Puppeteer to access Yahoo Finance.

- Feel free to modify the scraping logic or add new endpoints in server_temp.js.



