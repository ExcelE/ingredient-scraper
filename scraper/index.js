const scraper = require('./scraper.js')
const parser = require('./parser.js')
const ingParser = require('ingredientparser')

module.exports = async function(url, save, filename){
    
    return scraper(url, save, filename).then(resp => {
        var retDict = resp;
        var cleaned = [];

        retDict.ingredients.forEach(element => {
            var segmentedIngredients = ingParser.parse(parser.fix(element))
            segmentedIngredients.name = parser.beautify(segmentedIngredients.name)
            cleaned.push(segmentedIngredients)
        });

        retDict['cleaned'] = cleaned;
        // console.log(retDict['cleaned'])

        return new Promise((resolve, reject) => {
            resolve(retDict)
        });
    }).catch(err => {
        throw err;
    })
}