const scraper = require('./scraper.js');

const url = "https://www.allrecipes.com/recipe/268706/cranberry-sweet-potato-casserole/?internalSource=rotd&referringContentType=Homepage&clickId=cardslot%201"
const url1 = "https://www.epicurious.com/recipes/food/views/matchachocolate-chip-cookies"
const url2 = "https://www.foodnetwork.com/recipes/food-network-kitchen/ultimate-vanilla-cake-recipe-2110055"

const urls = [
    url,
    url1,
    url2
]
urls.map(url => {
    scraper(urls).then(resp => {
    console.log(resp)
    })
})
