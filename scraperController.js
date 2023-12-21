const scrapers = require('./scraper')

const scraperController = async (browserInstance) => {
    const url = 'https://ee6602.com/home/#/lottery?tabName=Lottery&id=47'
    try {
        let browser = await browserInstance

        let number = scrapers.scraperTitle(browser, url)

    } catch (error) {
        console.log('error: ', error);
    }
}

module.exports = scraperController