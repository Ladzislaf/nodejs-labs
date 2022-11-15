const http = require('http')

const PORT = 5000
let state = 'norm'

const server = http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf-8'
	})
	res.end(`<h3>${state}</h3>`)
})

server.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`)
	process.stdout.write(`${state}->`)
})

const changeState = (newState) => {
	if (newState === state) {
		process.stdout.write(`current state is already ${newState} \n${newState}->`)
	} else {
		process.stdout.write(`reg = ${state} --> ${newState} \n${newState}->`)
		state = newState
	}
}

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', () => {
	let chunk = null

	while ((chunk = process.stdin.read()) !== null) {
		switch(chunk.trim()){
			case 'norm': changeState('norm'); break
			case 'stop': changeState('stop'); break
			case 'test': changeState('test'); break
			case 'idle': changeState('idle'); break
			case 'exit': process.exit(0);
			default: process.stdout.write(`unexpected command ${chunk.trim()} \n${state}->`)
		}
	}
})
