const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const urlToScrape = "https://en.wikipedia.org/wiki/Function_(mathematics)";

const scrapeData = async (url) => {
    try {
        const response = await axios.get(url);
        const htmlData = cheerio.load(response.data, null, false);
        const items = htmlData("a");
        const itemsArray = [];

        items.each((index, item) => {
            itemsArray.push(htmlData(item).attr("href"));
        });

        fs.writeFile("data/scraped-data.json", JSON.stringify(itemsArray, null, 4), (error) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log("Data scraped");
        });

    } catch (error) {
        console.error(error);
    }
}

scrapeData(urlToScrape);
