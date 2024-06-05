const { User } = require('../models')

class UserController {
    static async register(req, res) {
        const { username, password, image } = req.body;
        try {
            const user = await User.create({ username, password, image });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username, password } });
            if (user) {
                res.json(user);
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static upload(req, res) {
        res.json({ message: 'Image uploaded' });
    }

}

module.exports = UserController