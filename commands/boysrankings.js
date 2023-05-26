import puppeteer from "puppeteer";

async function boysrankings({ pages }) {
    
    let data = await (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        let finalData = []

        await page.goto('https://www.ajga.org/rankings/boys')

        for (let i=0; i < Math.ceil(pages); i++) {
            let data2 = await page.evaluate(() => {

                let results = []
                let rankingsBody = document.getElementsByTagName('tbody')[0].children

                Array.from(rankingsBody).forEach((player) => {
                    let playerObject = {}
                    playerObject.ranking = player.children[0].innerText
                    playerObject.change = player.children[1].innerText
                    playerObject.name = player.children[2].innerText

                    try {
                        let country = player.children[3].children[0].getAttribute("alt")
                        playerObject.country = country.substring(0, country.length - 4)
                    } catch (err) {
                        playerObject.country = null
                    }

                    playerObject.graduation = player.children[4].innerText
                    playerObject.averagepoints = player.children[5].innerText
                    playerObject.events = player.children[6].innerText

                    results.push(playerObject)
                })

                
                return results
            })

            await page.goto(`https://www.ajga.org/rankings/boys?00000175-74a6-d353-ab7d-7ff6fe030004-p=${(i+2).toString()}`)
            
            data2.forEach((item) => {
                finalData.push(item)
            })
        }

        await browser.close();

        return finalData
    })();

    return data
}

export default boysrankings