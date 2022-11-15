const http = require('http')
const url = require('url')

const PORT = 5000

const fact = (k) => {
	return (k > 0) ? k * fact(k - 1) : 1
}

const server = http.createServer((req, res) => {
	let path = url.parse(req.url).pathname

	if(path === '/fact') {
		let param = url.parse(req.url, true).query.k
		if (typeof param !== undefined) {
			let k = parseInt(param)
			
			if(Number.isInteger(k)) {
				res.writeHead(200, {
					'Content-Type': 'application/json'
				})
	
				res.end(JSON.stringify({k: k, fact: fact(k)}))
			}
		}
	}
})

server.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`)
})
