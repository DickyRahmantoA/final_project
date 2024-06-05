const { Product, Category } = require('../models')

class ProductController {
    static async getProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: [{
                    model: Category,
                    as: 'category'
                }]
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProductsById(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id, {
                include: [{
                    model: Category,
                    as: 'category'
                }]
            });
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async add(req, res) {
        const { name, qty, categoryId, url, createdBy } = req.body;
        try {
            const product = await Product.create({ name, qty, categoryId, url, createdBy, updatedBy: createdBy });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { name, qty, categoryId, url, updatedBy, createdBy } = req.body;
        try {
            const product = await Product.findByPk(id);
            if (product) {
                await product.update({ name, qty, categoryId, url, createdBy, updatedBy });
                res.json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id);
            if (product) {
                await product.destroy();
                res.json({ message: 'Product deleted' });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController