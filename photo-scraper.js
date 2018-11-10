var gis = require('g-i-s');
var download = require('image-downloader')
const fs = require('fs-extra')
const { GoogleImageSearch } = require('free-google-image-search')

searchTitle = '2006 ABT Audi Allroad Quattro';

// gis(searchTitle, logResults);

GoogleImageSearch.searchImage("cats")
.then((res) => {
    console.log(res); // This will return array of image URLs
})

async function dirPlanner(folder) {
	var newPath = folder.replace(/\s+/g, '-').toLowerCase();
	try {
		await fs.ensureDir(newPath);
		console.log('success!');
	} catch (err) {
		console.error(err);
	}
}

dirPlanner(searchTitle);

function fileFormatChecker(filename) {
	if (filename.split('.').reverse()[0] !== 'jpg'){
		return false
	}
	return true
}

async function logResults(error, results) {
	if (error) {
	console.log(error);
	}
	else {
		var urlList = [];
		results.forEach(function(i, elem) {
			if(fileFormatChecker(i.url)){
				const options = {
					url: i.url,
					dest: __dirname + '/cat/' + i.url.split('/').reverse()[0].trim(),
				};
				urlList.push(options);
		}
		})
		urlList.forEach(function(i, elem) {
		download.image(i)
		.then(({ filename, image }) => {
			console.log('File saved to', filename)
		})
		.catch((err) => {
			console.error(err)
		})
		})
	}
	
}