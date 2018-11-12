const scraper = require('./scraper.js').scraper;

const url = "https://www.allrecipes.com/recipe/268706/cranberry-sweet-potato-casserole/?internalSource=rotd&referringContentType=Homepage&clickId=cardslot%201"


scraper(url).then(resp => {
    console.log(resp)
})
