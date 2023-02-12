const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const scrapeData = async (targetUrl, targetElement) => {
    try {
        const response = await axios.get(targetUrl);
        const htmlData = cheerio.load(response.data, null, false);
        const items = htmlData(targetElement);
        const itemsArray = [];

        items.each((index, item) => {
            itemsArray.push(htmlData(item).text());
        });

        fs.writeFile("scraped-data.json", JSON.stringify(itemsArray, null, 4), (error) => {
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

scrapeData("https://en.wikipedia.org/wiki/Function_(music)", "span.mw-headline");
