const http = require('http')
const url = require('url')

const data = require('./DB')

const PORT = 5000
const db = new data.DB()

db.on('GET', (req, res) => {
	res.end(JSON.stringify(db.select()))
})

db.on('POST', (req, res) => {
	req.on('data', (data) => {
		let obj = JSON.parse(data)
		db.insert(obj)
		res.end(JSON.stringify(obj))
	})
})

db.on('PUT', (req, res) => {
	req.on('data', (data) => {
		let obj = JSON.parse(data)
		db.update(obj)
		res.end(JSON.stringify(obj))
	})
})

db.on('DELETE', (req, res) => {
	let id = +url.parse(req.url, true).query.id;
	db.delete(id)
})

const server = http.createServer((req, res) => {
	let path = url.parse(req.url).pathname

	if(path === '/api/db') {
		db.emit(req.method, req, res)
	}
})

server.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`)
})
