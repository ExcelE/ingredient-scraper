const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs');
const colors = require('colors/safe')
const sanitize = require('sanitize-html')
const path = require('path')

// Drawback: can't update file unless the module is reloaded!
const siteSettings = require('./supported.json')

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
    var domain = new URL(url).hostname;
    var currSite = domain.split('.').reverse()[1];
    var retJson = {};
    siteSettings.forEach(function(i, elem, arr) {
        // Just to make sure that the ingredients are what comes out
        if(i.site === currSite) {
            retJson = i;
        }
    });

    (!Object.keys(retJson).length) ? retJson = {"site": currSite} : retJson;
    return retJson
}

async function scraper(url, save = false, fileout = Date.now()) {
    var checked = paradigmShift(url);
    
    if (Object.keys(checked).length === 1 && checked.constructor === Object) {
        // console.error(colors.bgRed(checked.site, "is currently not supported!"));
        return colors.bgRed(`\n${checked.site} is currently not supported!`);
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

