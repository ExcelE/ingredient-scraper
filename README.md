﻿# ingredient-scraper

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
2) ```node index.js```  

### Using the package  

    const scraper = require('./scraper.js').scraper;

    scraper(url).then(resp => {
            console.log(resp)
        })

### Options:
    
    scraper(url, save, filename)

```url```: specify the url to be scraped. Must be one of the supported URLs or an error will occur.   
```save```: if you specify ```save = true``` it will return a json of the scraped file.  
```filename```: custom filename for scraped json.  

