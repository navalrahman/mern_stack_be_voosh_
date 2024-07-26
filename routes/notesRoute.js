const express = require('express');
const notesController = require('../controllers/notesController')

const routes = express.Router()


const requireAuth = require('../middleware/requireAuth')


routes.use(requireAuth)

// create
routes.post('/create', notesController.createNote)

// get all 
routes.get('/getall', notesController.getallNote)

// get one note
routes.get('/getone/:id', notesController.getoneNote)

// delete one note
routes.delete('/deleteone/:id', notesController.deleteoneNote)

// update one note
routes.put('/updateone/:id', notesController.updateNote)

module.exports = routes