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
            res.json({
                success: true,
                message: 'Berhasil Mengambil Data',
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal Mengambil Data',
                error: error.message
            });
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
                res.json({
                    success: true,
                    message: 'Berhasil Mengambil Data',
                    data: product
                });
            } else {
                res.json({
                    success: false,
                    message: 'Gagal Mengambil Data'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }



    static async add(req, res) {
        const { name, qty, categoryId, url, createdBy } = req.body;
        try {
            await Product.create({ name, qty, categoryId, url, createdBy, updatedBy: createdBy });
            res.json({
                success: true,
                message: 'Berhasil Menyimpan Data'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal Menyimpan Data'
            });
        }
    }


    static async update(req, res) {
        const { id } = req.params;
        const { name, qty, categoryId, url, updatedBy, createdBy } = req.body;
        try {
            const product = await Product.findByPk(id);
            if (product) {
                await product.update({ name, qty, categoryId, url, createdBy, updatedBy });
                res.json({ success: true, message: 'Data berhasil diedit', product });
            } else {
                res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }


    static async delete(req, res) {
        const { id } = req.params;
        try {
            const product = await Product.findByPk(id);
            if (product) {
                await product.destroy();
                res.json({ success: true, message: 'Berhasil Hapus Data' });
            } else {
                res.json({ success: false, error: 'Gagal Hapus Data' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

}

module.exports = ProductController