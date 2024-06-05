const { Category } = require('../models')

class CategorieController {
    static getCategories(req, res) {
        Category.findAll()
            .then(categories => {
                res.json(categories)
            })
            .catch(err => {
                res.json(err)
            })
    }

    static addCategories(req, res) {
        const { name } = req.body;
        Category.create({
            name
        })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    static deleteCategories(req, res) {
        let id = +req.params.id
        Category.destroy({
            where: { id }
        })
            .then(result => {
                if (result === 1) {
                    res.json({
                        message: "Categorie hasbeen deleted!"
                    })
                } else {
                    res.json({
                        message: "Categorie failed to delete!"
                    })
                }
            })
            .catch(err => {
                res.json(err)
            })
    }

    static updateCategories(req, res) {
        let id = +req.params.id
        const { name } = req.body

        Category.update({
            name
        }, {
            where: { id }
        })
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err)
            })
    }
}

module.exports = CategorieController;