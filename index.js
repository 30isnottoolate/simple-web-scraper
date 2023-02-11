const axios = require("axios");
const cheerio = require("cheerio");

const urlToScrape = "https://en.wikipedia.org/wiki/Function_(mathematics)";

const scrapeData = async (url) => {
    try {
        const response = await axios.get(url);
        const htmlData = cheerio.load(response.data, null, false);
        const items = htmlData("h2");
    
        items.each((index, item) => {
            console.log(htmlData(item).text());
        });

    } catch(error) {
        console.error(error);
    }
}

scrapeData(urlToScrape);
