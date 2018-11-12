# ingredient-scraper

Very basic scraper intended for scraping ingredients from recipes. Will save a json file.

Supported sites:  
1) Allrecipes  
2) FoodNetwork  
3) Genius Kitchen  
4) EpiCurious  
5) CindyShopper  

#### Setting up environment
1) Install packages and dependencies   
> ```node install```  

### Using the package  

    const scraper = require('./scraper.js');

    scraper(url).then(resp => {
            console.log(resp)
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

    
