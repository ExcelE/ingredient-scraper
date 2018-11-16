const scraper = require('./index.js');

const urls = [
    "https://www.foodnetwork.com/recipes/food-network-kitchen/ultimate-vanilla-cake-recipe-2110055",
    "https://www.epicurious.com/recipes/food/views/matchachocolate-chip-cookies",
    "https://www.thekitchn.com/no-bake-pumpkin-cheesecake-263149",
    "http://www.eatingwell.com/recipe/259531/gluten-free-pumpkin-waffles/"
]

var sentence = "";

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