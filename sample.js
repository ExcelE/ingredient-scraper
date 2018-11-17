const scraper = require('./index.js');

const urls = [
    // "https://www.allrecipes.com/recipe/246521/dutch-oven-caraway-rye-bread/",
    // "https://www.geniuskitchen.com/recipe/kittencals-moist-cheddar-garlic-oven-fried-chicken-breast-82102",
    // "https://www.thekitchn.com/no-bake-pumpkin-cheesecake-263149",
    // "http://www.eatingwell.com/recipe/259531/gluten-free-pumpkin-waffles/",
    // "https://www.foodnetwork.com/recipes/food-network-kitchen/loaded-baked-potato-casserole-3757867",
    // "https://www.epicurious.com/recipes/food/views/instant-pot-choucroute-garnie",
    // "https://cincyshopper.com/chewy-pumpkin-chocolate-chip-cookies/",
    // "https://www.chowhound.com/recipes/sweet-potato-casserole-30197",
    // "https://www.thekitchn.com/easy-stuffing-recipe-263154",
    // "https://www.simplyrecipes.com/recipes/banana_bread/",
    // "https://www.cookinglight.com/recipes/slow-cooker-beef-and-barley-stew",
    // "https://www.bettycrocker.com/recipes/impossibly-easy-mushroom-swiss-turkey-burger-pie/c501a22e-ff7e-4c10-961a-fa3f48cc8305",
    // "http://www.eatingwell.com/recipe/268041/3-ingredient-cranberry-brie-bites/",
    // "https://www.myrecipes.com/recipe/almond-joy-candied-bacon",
    "https://www.cooks.com/recipe/8g9x26bj/turkey-pan-gravy.html",
    "https://www.kraftrecipes.com/recipe/050441/fluffy-tapioca-cream?categoryid=1"
]

var sentence = "";

urls.map(url => {
    scraper(url).then(resp => {
    console.log("\n",resp.recipeName)
    // var ingredients = resp.cleaned
    resp.directions.forEach(elem => {
        console.log("Step: ", elem)
    })
    resp.cleaned.forEach(elem => {
        console.log(elem)
    })
    }).catch(err => {
        console.error(err)
    })
})