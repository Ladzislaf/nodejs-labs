const EventEmitter = require('events')

let data = [
	{id: 1, name: 'username1', bday: '2001-02-02'},
	{id: 2, name: 'username2', bday: '2002-03-03'},
	{id: 3, name: 'username3', bday: '2003-04-04'},
	{id: 4, name: 'username4', bday: '2004-05-05'},
]

const validateData = (data) => {
	if(!data.match(/^\d\d\d\d-\d\d-\d\d$/))
		return false

	if (!Date.parse(data))
		return false

	if (Date.parse(data) > Date.now())
		return false

	return true
}

const validateId = (id) => {
	if (!Number.isInteger(id))
		return false
	else if (id < 1)
		return false

	return true
}

class DB extends EventEmitter {
	select() { return data }

	insert(object) { 
		if (!validateId(object.id))
			console.log('id is not valid')
		else if (data.filter(el => el.id === object.id).length > 0)
			console.log('this id is already exists')
		else if (!validateData(object.bday))
			console.log('data is not valid')
		else
			data.push(object)
	}

	update(object) {
		if (!validateId(object.id))
			console.log('id is not valid')
		else if (data.filter(el => el.id === object.id).length === 0)
			console.log('this id is unique')
		else if (!validateData(object.bday))
			console.log('data is not valid')
		else
			data.forEach((el, index) => { if (el.id === object.id) data[index] = object })
	}

	delete(id) { 
		if (!validateId(id))
			console.log('id is not valid')
		else if (data.filter(el => el.id === id).length === 0)
			console.log('this id is unique')
		else
			data = data.filter((el) => { return el.id !== id })
	}

	commit() { 
		// console.log('commit imitation') 
	}
}

exports.DB = DB
