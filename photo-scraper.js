var gis = require('g-i-s');
var download = require('image-downloader')
const fs = require('fs-extra')
var shuffle = require('shuffle-array')
const delay = require('delay')


let rawData = fs.readFileSync('carsBrand-28.json');
var cars = JSON.parse(rawData);

(async() => {
	for(let i = 0; i < 10; i++) {
		var carArray = cars.brands[i];
		var searchTitle = Object.keys(carArray).toString();
		await delay(500);
		currCar = dirPlanner(searchTitle);
		search(carArray, currCar)
	}
}) ();


function dirPlanner(folder) {
	var newPath = folder.replace(/\s+/g, '-').toLowerCase();
	// console.log(newPath)
	try {
		fs.ensureDirSync(`./cars/${newPath}`);
		// console.log('success!');
	} catch (err) {
		console.error(err);
		process.exit(-1);
	}
	return newPath;
}


function fileFormatChecker(filename) {
	return filename.split('.').reverse()[0] === 'jpg';
}

function imageDownloader(image) {
	// Check for file existance
	try {
		var exists = fs.statSync(image.dest);
	}
	catch(err) {
		download.image(image)
		.then(({ filename, image }) => {
			console.log('File saved to', filename)
		})
		.catch((err) => {
			console.error(err)
		})
	}
}


	

function search (query, dirName) {
	var keywords = query;
	for(var feature in keywords) {
		modelArray = keywords[feature];
		modelArray.forEach(function(key) {
			gis(key, (error, results) => {
				if (error) {
					console.log(error);
					}
					else {
						if (results.length === 0) console.log('No search results for', query)
						var urlList = [];
						results.forEach(function(i, elem) {
							if(fileFormatChecker(i.url)){
								const options = {
									url: i.url,
									dest: __dirname + `/cars/${dirName}/` + i.url.split('/').reverse()[0].trim(),
								};
								urlList.push(options);
						}})
						shuffle(urlList);
						for(let i = 0; i < 100; i++){
							imageDownloader(urlList[i]);
						}
					}
				}
			)
		})
		
	}
	
}