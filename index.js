const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs');
const colors = require('colors/safe')

const url = "https://www.geniuskitchen.com/recipe/greek-yogurt-dessert-with-honey-and-strawberries-422389"

function saver(json, name) {
    var jsoned = JSON.stringify(json, null, 4);
    fs.writeFile(`${name}.json`, jsoned, 'utf8', (err) => {
        if (err) throw err;
    });
}

function paradigmShift(url) {
    const curr = {"list": [
        {
            "site": "allrecipes",
            "title": "h1[itemprop=name]",
            "ingredients": ".recipe-ingred_txt.added"
        },
        {
            "site": "foodnetwork",
            "title": ".o-AssetTitle__a-HeadlineText",
            "ingredients": ".o-Ingredients__a-Ingredient"
        },
        {
            "site": "geniuskitchen",
            "title": "h1",
            "ingredients": ".food"
        },
        {
            "site": "epicurious",
            "title": "h1",
            "ingredients": ".ingredient"
        },
    ]};

    var currSite = url.split('.').slice(1)[0];
    var retJson = {};
    curr.list.forEach(function(i, elem, arr) {
        // Just to make sure that the ingredients are what comes out
        if(i.site === currSite) {
            retJson = i;
        }
    });

    return retJson;
}

async function scraper(url, fileout = Date.now()) {

    var checked = paradigmShift(url);
    
    if (Object.keys(checked).length === 0 && checked.constructor === Object) {
        console.error(colors.bgRed("Website currently not supported!"));
        process.exit(-1);
    }

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

        recipe.recipeName = $(checked.title).text();

        // store into ingredients array
        $(checked.ingredients).each(function(i, elem, arr) {
            // Just to make sure that the ingredients are what comes out
            if($(this).text().substring(0,3) !== 'Add') {
                recipe.ingredients.push($(this).html());
            }
        });
        var name = recipe.recipeName.split(' ').slice(0,2).join('-');
        var timestamp = fileout.toString().slice(-5,-1);
        saver(recipe, checked.site + '-' +name + '-' + timestamp);

    } catch (err) {
        console.error(err);
    }    
}

scraper(url);