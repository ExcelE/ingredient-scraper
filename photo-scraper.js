var gis = require('g-i-s');
var download = require('image-downloader')
const fs = require('fs-extra')

let rawData = fs.readFileSync('carsList.json');
var cars = JSON.parse(rawData);

for(let i = 0; i < 5; i++) {
	searchTitle = cars.carsList[i];
	console.log(searchTitle);
	currCar = dirPlanner(searchTitle);
	gis(searchTitle, (error, results) => logResults(error, results, currCar));
}

// cars.carsList.forEach(element => {
// 	searchTitle = element;
// 	console.log(searchTitle);
// 	currCar = dirPlanner(searchTitle);
// 	gis(searchTitle, (error, results) => logResults(error, results, searchTitle));
// });


function dirPlanner(folder) {
	var newPath = folder.replace(/\s+/g, '-').toLowerCase();
	try {
		fs.ensureDir(`./cars/${newPath}`);
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
	download.image(image)
	.then(({ filename, image }) => {
		console.log('File saved to', filename)
	})
	.catch((err) => {
		console.error(err)
	})
}

async function logResults(error, results, query) {
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
					dest: __dirname + `/cars/${query}/` + i.url.split('/').reverse()[0].trim(),
				};
				urlList.push(options);
		}})
		
		for(let i = 0; i < 30; i++){
			imageDownloader(urlList[i]);
		}
	}
	
}