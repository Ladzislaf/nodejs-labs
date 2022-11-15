const http = require('http')
const url = require('url')
const fs = require('fs')

const PORT = 5000

const fact = (k) => {
	return (k > 0) ? k * fact(k - 1) : 1
}

function Fact(k, func) {
    this.k = k
    this.fact = fact
    this.func = func
    this.calculateFact = () => {setImmediate(() => {this.func(null, this.fact(this.k))})};
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
	
				let facts = new Fact(k, (err, result) => {
					err != null ? console.log('Error: ' + err) : res.end(JSON.stringify({ k: k, fact: result }))
				})

				facts.calculateFact()
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
