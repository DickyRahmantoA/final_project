const { User } = require('../models');

class UserController {
    static async register(req, res) {
        const { username, password } = req.body;
        const image = req.file ? req.file.path : null;

        console.log('Request body:', req.body);
        console.log('Image path:', image);

        try {
            // Cek apakah username sudah ada
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(200).json({ success: false, message: 'Username sudah ada' });
            }

            // Buat user baru
            await User.create({ username, password, image });
            res.json({ success: true, message: 'Berhasil register' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server', error: error.message });
        }
    }


    static async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username, password } });
            if (user) {
                res.json({ success: true, message: 'Berhasil Login', user });
            } else {
                res.json({ success: false, message: 'Username dan Password Salah' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = UserController;
