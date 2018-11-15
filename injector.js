const cheerio = require('cheerio')
const request = require('request')

async function scraper(url) {
    
    try{

        // Scrape
        const htmlResult = await request.get(url);
        // HTML Tag selector:

        const $ = await cheerio.load(htmlResult, {
            decodeEntities: false 
        });

        var category = $('h2').filter(function() {
            return $(this).text().indexOf('Ingredients') > -1;
          }).next().text();

        console.log(category)

    } catch (err) {
        throw err;
    }    

}

const url = "https://www.allrecipes.com/recipe/268706/cranberry-sweet-potato-casserole/"
scraper(url)