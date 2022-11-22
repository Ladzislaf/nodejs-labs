const http = require('http')
const url = require('url')
const fs = require('fs')

const data = require('./DB')

const PORT = 5000
const db = new data.DB()

db.on('GET', (req, res) => {
	requestsCount++
	res.end(JSON.stringify(db.select()))
})

db.on('POST', (req, res) => {
	requestsCount++
	req.on('data', (data) => {
		let obj = JSON.parse(data)
		db.insert(obj)
		res.end(JSON.stringify(obj))
	})
})

db.on('PUT', (req, res) => {
	requestsCount++
	req.on('data', (data) => {
		let obj = JSON.parse(data)
		db.update(obj)
		res.end(JSON.stringify(obj))
	})
})

db.on('DELETE', (req, res) => {
	requestsCount++
	let id = +url.parse(req.url, true).query.id;
	db.delete(id)
})

db.on('COMMIT', (req, res) => {
	db.commit()
	commitsCount++
})

const server = http.createServer((req, res) => {
	let path = url.parse(req.url).pathname

	if(path === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
		res.end(fs.readFileSync('./05-01.html'))
	} else if(path === '/api/db') {
		db.emit(req.method, req, res)
	} else if(path === '/api/ss') {
		res.end(JSON.stringify(stats))
	}
})

server.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`)
})

let timer = null
let interval = null
let statistics = null
let commitsCount = 0, requestsCount = 0
let stats = { dateStart: '', dateEnd: '', timeStart: '', timeEnd: '', commits: 0, requests: 0 }

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', () => {
	let chunk = null

	while ((chunk = process.stdin.read()) !== null) {
		let args = chunk.split(' ')
		let command = args[0].trim()
		let argument = +args[1]

		switch(command) {
			case 'sd':
				if (argument) {
					clearTimeout(timer)
					console.log(`=> the server will be closed after ${argument} seconds`)
					timer = setTimeout(() => {
						server.close(() => console.log('=> server terminate'))
						timer = null
					}, argument * 1000)
				} else {
					timer ? console.log('=> server closing rejected') : console.log('=> server is not closing')
					clearTimeout(timer)
					timer = null
				}
				break
			case 'sc':
				if (argument) {
					clearInterval(interval)
					console.log(`=> commits run every ${argument} seconds`)
					interval = setInterval(() => {
						db.emit('COMMIT')
					}, argument * 1000)
					interval.unref()
					interval = null
				} else {
					interval ? console.log('=> commits stopped') : console.log('=> commits already stopped')
					clearInterval(interval)
					interval = null
				}
				break
			case 'ss':
				if (argument) {
					clearTimeout(statistics)
					console.log(`=> getting stats started for ${argument} seconds`)

					commitsCount = 0
					requestsCount = 0
					let newStats = { 
						dateStart: new Date().toLocaleDateString(),
						dateEnd: '',
						timeStart: new Date().toLocaleTimeString(),
						timeEnd: '',
						commits: 0,
						requests: 0
					} 

					statistics = setTimeout(() => {
						newStats.dateEnd = new Date().toLocaleDateString()
						newStats.timeEnd = new Date().toLocaleTimeString()
						newStats.commits = commitsCount
						newStats.requests = requestsCount
						stats = newStats
						console.log('=> STATS: commits count: ' + stats.commits)
						console.log('=> STATS: requests count: ' + stats.requests)
						statistics = null
					}, argument * 1000)
					statistics.unref()
				} else {
					statistics ? console.log('=> getting stats stopped') : console.log('=> getting stats not running')
					clearTimeout(statistics)
					statistics = null
				}
				break
			case 'exit':
				process.exit(0)
				break
			default:
				console.log(`unexpected command ${command}`)
		}
	}
})
