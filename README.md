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
2) ```node index.js```


## Photo-scraper

Work in progress.   
Goal: When supplied with a JSON file with a list of search terms, the script will download images from Google Search and place them in their appropriate folder.  

Example:  

searchTerms = ["first foo", "second bar", "ThiRd ChArLie gaME"]

```node photo-scraper.js```

Folder Structure:
> first-foo  
>> 0.jpg  
>> 1.jpg  
>> ...  
>second-bar  
>> 0.jpg  
>> 1.jpg  
>> ...  
> third-charlie-game  
>> 0.jpg  
>> 1.jpg  
>> ...  
