const gis = require('g-i-s');
const download = require('image-downloader')
const fs = require('fs-extra')
const shuffle = require('shuffle-array')
const delay = require('delay')
const rawData = fs.readFileSync('carsBrand-28.json');
const cars = JSON.parse(rawData);

(async() => {
	for(let i = 0; i < 1; i++) {
		var carArray = cars.brands[i];
		var searchTitle = Object.keys(carArray).toString();
		await delay(5000);
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

async function scrapeAndDownload(key, dirName) {
	gis(key, async (error, results) => {
		if (error) {
			console.log(error);
		} else {
			if (results.length === 0) {
				console.log('No search results for', key)
				return
			}
			// Create array of 100 random indexes from results to download images from
			const indexes = Array.from({ length: 100 }, () => Math.floor(Math.random() * results.length))
			for (const num of indexes) {
				const i = results[num]
				if (!fileFormatChecker(i.url)) continue;
				await delay(200);
				imageDownloader({
					url: i.url,
					dest: __dirname + `/cars/${dirName}/` + i.url.split('/').reverse()[0].trim(),
				})
			}
		}
	})
}

async function search (query, dirName) {
	var keywords = query;
	// Per brand
	for (var feature in keywords) {
		modelArray = keywords[feature];
		if (!Array.isArray(modelArray)) {
			 console.log('Array not found for', feature)
			continue
		}
		// Per car
		for(let i = 0; i < modelArray.length; i++){
			await delay(500);
			scrapeAndDownload(modelArray[i], dirName);
		}
		
	}
}