const http = require('http')
const fs = require('fs')

const PORT = 5000
const fileName = './img/patrik.jpg'

const server = http.createServer((req, res) => {
	if(req.url === '/image') {
		let jpg = null

		jpg = fs.readFileSync(fileName)

		res.writeHead(200, {
			'Content-Type': 'image/jpeg; charset=utf-8'
		})
		
		res.end(jpg)
	}
})

server.listen(PORT, () => console.log(`sever running on PORT: ${PORT}`))
