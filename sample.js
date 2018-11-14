const scraper = require('./scraper');
const ing = require('ingredientparser');

const urls = [
    "https://www.foodnetwork.com/recipes/food-network-kitchen/ultimate-vanilla-cake-recipe-2110055",
    "https://www.epicurious.com/recipes/food/views/matchachocolate-chip-cookies",
    "https://cookpad.com/us/recipes/439487-soft-and-chewy-chocolate-chip-cookies"
]

var sentence = "";



// var sen = "1 papaya (if making vegan, add 1 to 2 tablespoons of water)";
// var regex = /to/gi;

// var newSen = clean(sen)

// console.log(newSen, "=> ",ing.parse(newSen))

urls.map(url => {
    scraper(url).then(resp => {
    // console.log(url, resp)
    // var ingredients = resp.cleaned
    resp.cleaned.forEach(elem => {
        console.log(elem.name)
    })
    }).catch(err => {
        console.error(err)
    })
})