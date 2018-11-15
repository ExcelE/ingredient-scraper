const scraper = require('./scraper');
const ing = require('ingredientparser');

const urls = [
    "https://www.foodnetwork.com/recipes/food-network-kitchen/ultimate-vanilla-cake-recipe-2110055",
    "https://www.epicurious.com/recipes/food/views/matchachocolate-chip-cookies",
    "https://www.thekitchn.com/no-bake-pumpkin-cheesecake-263149",
    "http://www.eatingwell.com/recipe/259531/gluten-free-pumpkin-waffles/"
]

var sentence = "";



// var sen = "1 papaya (if making vegan, add 1 to 2 tablespoons of water)";
// var regex = /to/gi;

// var newSen = clean(sen)

// console.log(newSen, "=> ",ing.parse(newSen))

urls.map(url => {
    scraper(url).then(resp => {
    console.log("\n",resp.recipeName)
    // var ingredients = resp.cleaned
    resp.cleaned.forEach(elem => {
        console.log(elem)
    })
    }).catch(err => {
        console.error(err)
    })
})