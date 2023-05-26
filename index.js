// Initialize Express
import express from "express"
const app = express()
const port = 3000

// Import Commands
import boysrankings from "./commands/boysrankings.js"
import girlsrankings from "./commands/girlsrankings.js"


app.get('/', (req, res) => {
    res.send('Welcome to AJGA Scraper Api! Created by Xezo. Please view /commands for a full list of available data! Optimization is absolutely horrendous with Puppeteer. :)')
})

app.get("/rankings/boys/:pages", async (req, res) => {
    let data = await boysrankings(req.params)
    res.send(data)
})


app.get("/rankings/girls/:pages", async (req, res) => {
    let data = await girlsrankings(req.params)
    res.send(data)
})

app.listen(port, () => {
    console.log(`Started AJGA Scraper Api on port:${port}`)
})