
const download = require('image-downloader')
const fs = require('fs-extra')
const delay = require('delay')
const rawData = fs.readFileSync('carsBrand-28.json')
const scraper = require('images-scraper')
const bing = new scraper.Bing()
const cars = JSON.parse(rawData);
const datetime = require('node-datetime');
const colors = require('colors/safe')

const MAXIMUM_BRANDS = 100
const MAXIMUM_IMAGES_PER_MODEL = 1000
const REQUEST_DELAY_IN_MS = 2000

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
	// for (let i = 0; i < MAXIMUM_BRANDS; i++) {
		await delay(REQUEST_DELAY_IN_MS);
		for (var key in cars.brands) {
			for(var name in cars.brands[key])
				cars.brands[key][name].forEach((model) => {
					const dirName = pathCleaner(model);
					search(model, name)
				})
			//   cars.brands[key].forEach(async (model) => {
			// 	await delay(REQUEST_DELAY_IN_MS);
			// 	const dirName = pathCleaner(model);
			// 	console.log(dirName)
			//   })
		}
		// cars.brands.forEach(async (brands) => {
		// 	const dirName = pathCleaner(brands);
		// 	console.log(dirName)
		// 	// search(brands, dirName)
		// });
	// }
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

function search (query, dirName) {
	// await delay(REQUEST_DELAY_IN_MS);
	bing.list({ 
		keyword: query, 
		num: MAXIMUM_IMAGES_PER_MODEL, 
		detail: true,
	})
	.then((res) => {
		if (res.length === 0) return console.log(currTime(), 'No results for', query, "=>", `/cars/${dirName}`)
		for (const i of res) {
			delay(500);
			if (i.format !== 'jpeg') continue
			imageDownloader({
				url: i.url,
				dest: __dirname + `/cars/${dirName}`,
				headers: {
					// Some sites will refuse to service requests without appropriate headers
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
				}
			})
		}
	})
	.catch(console.log)

}