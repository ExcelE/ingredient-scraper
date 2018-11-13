const scraper = require('./scraper');

const url = "https://cookpad.com/us/recipes/439487-soft-and-chewy-chocolate-chip-cookies"
const url1 = "https://www.epicurious.com/recipes/food/views/matchachocolate-chip-cookies"
const url2 = "https://www.foodnetwork.com/recipes/food-network-kitchen/ultimate-vanilla-cake-recipe-2110055"

const urls = [
    url, // not supported
    url1, // supported
    url2 // supported
]
urls.map(url => {
    scraper(url).then(resp => {
    console.log(url, resp)
    }).catch(err => {
        console.log(err)
    })
})
