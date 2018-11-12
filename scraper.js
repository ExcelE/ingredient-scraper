const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs');
const colors = require('colors/safe')
const sanitize = require('sanitize-html')
const path = require('path')

module.exports = async function(url, save, filename) {
    return await scraper(url, save, filename);
};

const url = "https://cincyshopper.com/copycat-chick-fil-a-sandwich/"

function saver(json, name) {
    var jsoned = JSON.stringify(json, null, 4);
    var filename = path.join(process.cwd(), `${name}.json`);
    fs.writeFile(filename, jsoned, 'utf8', (err) => {
        if (err) throw err;
    });
}

function sanitizer(dirty) {
    var clean = sanitize(dirty, {
        allowedTags: [],
        allowedAttributes: [],
    });
    return clean.trim();
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
            "ingredients": ".ingredient",
        },
        {
            "site": "cincyshopper",
            "title": "h2[class=wprm-recipe-name]",
            "ingredients": ".wprm-recipe-ingredient-name",
        }
    ]};

    var domain = new URL(url).hostname;
    var currSite = domain.split('.').reverse()[1];
    var retJson = {};
    curr.list.forEach(function(i, elem, arr) {
        // Just to make sure that the ingredients are what comes out
        if(i.site === currSite) {
            retJson = i;
        }
    });

    return retJson;
}

async function scraper(url, save = false, fileout = Date.now()) {
    var checked = paradigmShift(url);
    
    if (Object.keys(checked).length === 0 && checked.constructor === Object) {
        console.log(checked);
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

        recipe.recipeName = sanitizer($(checked.title).text());

        // store into ingredients array
        $(checked.ingredients).each(function(i, elem, arr) {
            // Just to make sure that the ingredients are what comes out
            if($(this).text().substring(0,3) !== 'Add') {
                recipe.ingredients.push(sanitizer($(this)));
            }
        });
        var name = recipe.recipeName.split(' ').slice(0,2).join('-');
        var timestamp = fileout.toString().slice(-5,-1);

        if(save === true) saver(recipe, checked.site + '-' + name.toString() + '-' + timestamp);
        
        return new Promise((resolve, reject) => {
            resolve(recipe)
        });

    } catch (err) {
        console.error(err);
    }    

}

