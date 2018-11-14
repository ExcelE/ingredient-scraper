const scraper = require('./scraper.js')
const parser = require('./parser.js')
const ingParser = require('ingredientparser')

module.exports = async function(url, save, filename){
    
    return scraper(url, save, filename).then(resp => {
        var retDict = resp;
        var cleanedIngredients = [];

        retDict.ingredients.forEach(element => {
            var item = ingParser.parse(parser(element))
            cleanedIngredients.push(item)
        });

        retDict['cleaned'] = cleanedIngredients;
        // console.log(retDict['cleaned'])

        return new Promise((resolve, reject) => {
            resolve(retDict)
        });
    }).catch(err => {
        throw err;
    })

}