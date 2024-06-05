const productRoute = require('express').Router()
const ProductController = require('../controllers/ProductController')

productRoute.get('/', ProductController.getProducts)
productRoute.get('/:id', ProductController.getProductsById)

productRoute.post('/add', ProductController.add)
productRoute.put('/update/:id', ProductController.update)
productRoute.delete('/delete/:id', ProductController.delete)

module.exports = productRoute