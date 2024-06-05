const categorieRoute = require('express').Router()
const CategoryController = require('../controllers/CategoryController')

categorieRoute.get('/', CategoryController.getCategories)

categorieRoute.post('/add', CategoryController.addCategories)
categorieRoute.put('/update/:id', CategoryController.updateCategories)
categorieRoute.delete('/delete/:id', CategoryController.deleteCategories)

module.exports = categorieRoute