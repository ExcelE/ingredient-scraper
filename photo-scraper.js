
const download = require('image-downloader')
const fs = require('fs-extra')
const delay = require('delay')
const rawData = fs.readFileSync('carBrandsOnly.json')
const scraper = require('images-scraper')
const bing = new scraper.Bing()
const cars = JSON.parse(rawData);
const datetime = require('node-datetime');
const colors = require('colors/safe')

const MAXIMUM_BRANDS = 15
const MAXIMUM_IMAGES_PER_MODEL = 2000
const REQUEST_DELAY_IN_MS = 100

function testImage() {
	imageDownloader({
		url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
		dest: __dirname,
		headers: {
			// Some sites will refuse to service requests without appropriate headers
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
		}
	})
}

;(async() => {
	var len = (MAXIMUM_BRANDS > cars.brands.length) ? MAXIMUM_BRANDS : cars.brands.length;
	for (let i = 0; i < len; i++) {
		const carArray = cars.brands[i];
		// const searchTitle = Object.keys(carArray).toString();
		const currCar = carArray.replace(/\s+/g, '-').toLowerCase()
		await delay(500);
		// console.log(carArray[searchTitle][0], " => ", pathCleaner(carArray[searchTitle][0]))
		// testImage();
		search(carArray, currCar)
	}
}) ();

async function imageDownloader(image) {
	// Check for file existance
	try {
		if (!fs.existsSync(image.dest)) fs.ensureDirSync(image.dest)
		var name = image.dest + "/"  + image.url.split('/').reverse()[0]
		if (fs.existsSync(name)) {
			console.log(currTime(), colors.bgBlue("File exists!"), "Not downloading..." , image.url.split('/').reverse()[0] ,"");
			return;
		}
		const res = await download.image(image)
		console.log(currTime(), colors.bgGreen("Downloaded!") ,'File saved to', res.filename)
	}
	catch(err) {
		console.log(currTime(), colors.bgRed("ERROR!"), 'Image Downloader err', err)
	}
}

function currTime() {
	return datetime.create().format('[H:M:S]');
}

function pathCleaner(folderName) {
	if (typeof folderName === 'string') {
		return folderName.replace(/\s+/g, '-').toLowerCase()
	}
}

async function search (query, dirName) {
	// var key = query;
	var key = query;
	// Per car
	await delay(REQUEST_DELAY_IN_MS);
	bing.list({ keyword: key, num: MAXIMUM_IMAGES_PER_MODEL, detail: true })
	.then(res => {
		delay(REQUEST_DELAY_IN_MS);
		if (res.length === 0) return console.log(currTime(), 'No results for', key)
		for (const i of res) {
			delay(500);
			if (i.format !== 'jpeg') continue
			imageDownloader({
				url: i.url,
				dest: __dirname + `/cars/${dirName}`,
				headers: {
					// Some sites will refuse to service requests without appropriate headers
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
				},
				maxRedirects: 3,
				timeout: 1000,
			})
		}
	})
	.catch(console.log)
}
	