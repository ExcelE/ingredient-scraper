function paradigmShift(url) {
    const curr = {"list": [
        {
            "site": "allrecipes",
            "title": "h1[itemprop=name]",
            "ingredients": ".recipe-ingred_txt.added"
        },
        {
            "site": "foodnetwork",
            "title": ".o-AssetTitle__a-HeadlineText",
            "ingredients": ".o-Ingredients__a-Ingredient"
        }
    ]};

    var currSite = url.split('.').slice(1)[0];
    var retJson = {};
    curr.list.forEach(function(i, elem, arr) {
        // Just to make sure that the ingredients are what comes out
        if(i.site === currSite) {
            retJson = i;
        }
    });

    return retJson;
}

var url = "https://www.foodnetwork.com/recipes/tyler-florence/mashed-potatoes-recipe-1943035"
var sample = paradigmShift(url);
console.log(sample);