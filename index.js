const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs');

const url = "https://www.allrecipes.com/recipe/268706/cranberry-sweet-potato-casserole/?internalSource=rotd&referringContentType=Homepage&clickId=cardslot%201"


function saver(json, name) {
    var jsoned = JSON.stringify(json, null, 4);
    fs.writeFile(`${name}.json`, jsoned, 'utf8', (err) => {
        if (err) throw err;
    });
}

async function scraper(url, fileout = Date.now()) {
    try {
        var recipe = {
            recipeName: "",
            ingredients: [],
        }
        // Scrape
        const htmlResult = await request.get(url);
        // HTML Tag selector:

        const $ = await cheerio.load(htmlResult, {
            decodeEntities: false 
        });

        recipe.recipeName = $('h1[itemprop=name]').text();

        // store into ingredients array
        $('.recipe-ingred_txt.added').each(function(i, elem, arr) {
            // Just to make sure that the ingredients are what comes out
            if($(this).text().substring(0,3) !== 'Add') {
                recipe.ingredients.push($(this).html());
            }
        });
        var name = recipe.recipeName.split(' ')[0];

        saver(recipe, name + '-' + fileout);

    } catch (err) {
        console.error(err);
    }    
}

scraper(url);