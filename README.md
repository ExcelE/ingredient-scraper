# ingredient-scraper

Another ingredient/recipe scraper. 

Supported sites:  

1) Allrecipes  
2) FoodNetwork  
3) Genius Kitchen  
4) EpiCurious  
5) CindyShopper  
6) The Kitchn  
7) Chowhound  
8) Simply Recipes  
9) Cooking Light  
10) Betty Crocker  
11) MyRecipes  
12) Eating Well  
13) Cooks  
14) Kraft Recipes  


==============================
### Table of Contents:  
1) [Setting up environment](#Setting-up-environment)
2) [Using the package](#Using-the-package)
3) [Package Options](#Options)
4) [Package Output and Return Example](#More-Details-about-Return)

==============================


## Setting up environment
1) Install packages and dependencies   
> ```node install```  

### Importing the Package to Your Project  
1) Download the ```scraper``` folder and place it somewhere to your projects.  
2) Install the following dependencies:  
    
    cheerio  
    request-promise  
    fs  
    colors/safe  
    sanitize-html  
    path  
    ingredientparser  

3) Import to your project:  

    const scraper = require('./path/to/scraper')

==============================

## Using the package  

    const scraper = require('./scraper');

    scraper(url).then(resp => {
    resp.cleaned.forEach(elem => {
        console.log(elem.name)
    })
    }).catch(err => {
        console.error(err)
    })
    // prints the ingredients to your screen

### Options:
    
    scraper(url, save, filename)

```url```: specify the url to be scraped. Must be one of the supported URLs or an error will occur.   
```save```: *optional*, if you specify ```save = true``` it will save a json of the scraped file.  
```filename```: *optional*, custom filename for scraped json.  

### More Examples:
    const scraper = require('./scraper.js');

    scraper(url, true).then(resp => {
            console.log(resp)
        })
    // saves the json on your current directory as
    // allRecipe-Caserole-2831.json

Example:

    const scraper = require('./scraper.js');

    scraper(url, true, "Caserole-recipe.json").then(resp => {
            console.log(resp)
        })
    // saves the json on your current directory as
    // Caserole-recipe.json

## More Details about Return:

The module will return a json file with 3 things:  
1) The name of the recipe
2) An array of the ingredients list  
3) A cleaned/parsed ingredients list  

For example:  
```
    { recipeName: 'Matcha–Chocolate Chip Cookies',  
    ingredients:  
    [ 'Nonstick olive or coconut oil cooking spray',  
        '3/4 cup gluten-free flour',  
        '1/2 teaspoon aluminum-free baking powder',  
        '1/4 teaspoon sea salt',  
        '3 tablespoons unrefined coconut oil, melted',  
        '1 teaspoon organic vanilla extract',  
        '1/3 cup organic sugar (or 5 drops of stevia)',  
        '1 egg (if making vegan, add 1 to 2 tablespoons of water)',  
        '1 1/2 ripe medium bananas, mashed',  
        '1/2 cup organic rolled oats',  
        '1 cup semisweet chocolate chips',  
        '1 tablespoon matcha powder, sifted' ],  
    cleaned:  
    [ { name: 'Nonstick olive or coconut oil cooking spray' },  
    { amount: '3/4', unit: 'Cup', name: 'gluten-free flour' },  
        { amount: '1/2',  
        unit: 'Teaspoon',  
        name: 'aluminum-free baking powder' },  
        { amount: '1/4', unit: 'Teaspoon', name: 'sea salt' },  
        { amount: '3',  
        unit: 'Tablespoon',  
        name: 'unrefined coconut oil' },  
        { amount: '1',  
        unit: 'Teaspoon',  
        name: 'organic vanilla extract' },  
        { amount: '1/3', unit: 'Cup', name: 'organic sugar' },  
        { amount: '1', name: 'egg' },  
        { amount: '1 1/2', name: 'ripe medium bananas' },  
        { amount: '1/2', unit: 'Cup', name: 'organic rolled oats' },  
        { amount: '1', unit: 'Cup', name: 'semisweet chocolate chips' },  
        { amount: '1', unit: 'Tablespoon', name: 'matcha powder' } ] }  
```
