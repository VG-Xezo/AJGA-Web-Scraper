import puppeteer from "puppeteer";

async function boyssearch({ firstName, lastName }) {

    let data = await (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        

        async function playerLookup(firstName, lastName) {
            await page.goto(`https://www.ajga.org/player/${firstName}-${lastName}`, {waitUntil: "domcontentloaded"})

            let playerObj = {}
            let [imgUrl, hometown, gradYear, college, name] = await page.evaluate(() => {
                
                
                let userImage = document.getElementsByClassName("UserPublicProfilePage-userHeadingContent")[0].children[0].children[0].getAttribute("src")
                let userInfo = document.getElementsByClassName("UserPublicProfilePage-userHeadingContent")[0].children[1].children
                
                let userName = userInfo[0].innerText
                let userHometwon = userInfo[1].innerText
                let userGradYear = userInfo[2].innerText
                userGradYear = userGradYear.substr(userGradYear.length - 4)

                let userCollege = {}

                try {
                    if (userInfo[3].innerText) {
                        if (userInfo[3].classList.contains("UserPublicProfilePage-playerLetterOfIntent")) {
                            userCollege.type = "Letter of Intent"
                        }
                        if (userInfo[3].classList.contains("UserPublicProfilePage-playerVerbalIntent")) {
                            userCollege.type = "Verbal Intent"
                        }
                        let collegeName = userInfo[3].innerText
                        userCollege.name = collegeName.substring(collegeName.indexOf(":") + 1)
                    }
                } catch (err) {
                    userCollege.name = "unknown"
                }

                return [userImage, userHometwon, userGradYear, userCollege, userName]
            })

            playerObj.name = name
            playerObj.playerImage = imgUrl
            playerObj.hometown = hometown
            playerObj.graduation = gradYear
            playerObj.college = college

            let [ranking, points, bonusPoints, events, averagePoints] = await page.evaluate(() => {
                let rankingItems = document.getElementsByClassName("RankingStatsList-items")[0].children

                let userRanking = rankingItems[0].innerText
                userRanking = userRanking.substring(userRanking.indexOf(":") + 1)

                let userPoints = rankingItems[1].innerText
                userPoints = userPoints.substring(userPoints.indexOf(":") + 1)

                let userBonusPoints = rankingItems[2].innerText
                userBonusPoints = userBonusPoints.substring(userBonusPoints.indexOf(":") + 1)

                let userEvents = rankingItems[3].innerText
                userEvents = userEvents.substring(userEvents.indexOf(":") + 1)

                let userAveragePoints = rankingItems[4].innerText
                userAveragePoints = userAveragePoints.substring(userAveragePoints.indexOf(":") + 1)

                return [userRanking, userPoints, userBonusPoints, userEvents, userAveragePoints]
            })
            playerObj.ranking = ranking
            playerObj.points = points
            playerObj.bonuspoints = bonusPoints
            playerObj.numberofevents = events
            playerObj.averagepoints = averagePoints

            let [fullEvents, scoringAverage] = await page.evaluate(() => {
                let eventTable = document.getElementsByTagName("tbody")[0].children
                let eventArray = []
                let eventScores = []

                Array.from(eventTable).forEach((item) => {
                    let eventObj = {}
                    eventObj.finish = item.children[0].innerText
                    eventObj.date = item.children[1].children[0].innerText
                    eventObj.name = item.children[2].innerText

                    let scores = item.children[3].innerText
                    scores = scores.split("-")
                    eventObj.scores = scores

                    scores.forEach((score) => {
                        if (!parseInt(score)) { return }
                        eventScores.push(parseInt(score))
                    })

                    eventObj.total = item.children[4].innerText
                    eventObj.pointsearned = item.children[5].innerText
                    eventArray.push(eventObj)
                })

                let eventScoresTotal = 0
                eventScores.forEach((score) => {
                    if (score) {
                        eventScoresTotal += score 
                    }
                })
                let userScoringAverage = +(eventScoresTotal / eventScores.length).toFixed(2)

                return [eventArray, userScoringAverage]

            })

            playerObj.events = fullEvents
            playerObj.scoringaverage = scoringAverage

            return playerObj
        }

        if (firstName && lastName) {
            return await playerLookup(firstName, lastName)
        }

        if (firstName || lastName) {
            if (firstName) {
                await page.goto(`https://www.ajga.org/rankings/boys?q=${firstName}`, { waitUntil: "domcontentloaded" })
            } else if (lastName) {
                await page.goto(`https://www.ajga.org/rankings/boys?q=${lastName}`, { waitUntil: "domcontentloaded" })
            }

            let playerNames = await page.evaluate(() => {
                let resultsTable = document.getElementsByTagName("tbody")[0].children
                
                let finalData = []
                Array.from(resultsTable).forEach((item) => {
                    let playerName = []
                    let playerLink = item.children[2].children[0]
                    let link = playerLink.getAttribute("href").split("/")[2]
                    
                    let firstName = link.split("-")[0]
                    let lastName = link.split("-")[1]
                    if (link.split("-").length > 2) {
                        lastName = ""
                        link.split("-").forEach((word, index) => {
                            if (index > 0) {
                                if (index == link.split("-").length-1) {
                                    lastName += word
                                } else {
                                    lastName += (word + "-")
                                }
                            }
                        })
                    }
                    playerName.push(firstName)
                    playerName.push(lastName)

                    finalData.push(playerName)
                })
                return finalData
            })
            let returnData = []
            for (let i=0; i < playerNames.length; i++) {
                let firstname = playerNames[i][0]
                let lastname = playerNames[i][1]

                returnData.push(await playerLookup(firstname, lastname))
            }

            return returnData
        }


        
    })();

    return data
}

export default boyssearch