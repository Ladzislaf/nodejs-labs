const http = require('http')
const url = require('url')
const fs = require('fs')

const PORT = 5000

const fact = (k) => {
	return (k > 0) ? k * fact(k - 1) : 1
}

const server = http.createServer((req, res) => {
	let path = url.parse(req.url).pathname

	if(path === '/fact') {
		let param = url.parse(req.url, true).query.k
		let html = fs.readFileSync('./03-03.html')

		if (param !== undefined) {
			let k = parseInt(param)
			
			if(Number.isInteger(k)) {
				res.writeHead(200, {
					'Content-Type': 'application/json'
				})
	
				setImmediate(() => res.end(JSON.stringify({k: k, fact: fact(k)})))
			}
		} else {
			res.writeHead(200, {
				'Content-Type': 'text/html; charset=utf-8'
			})
	
			res.end(html)
		}
	}
})

server.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`)
})
