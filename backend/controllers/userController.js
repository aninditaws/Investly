const supabase = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mendapatkan semua pengguna
const getUsers = async (req, res) => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.status(200).json(data);
};

// Menambah pengguna baru
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, password }]);

    if (error) {
        console.error('Error adding user:', error);
        return res.status(500).json({ error: 'Failed to add user' });
    }

    res.status(201).json(data);
};

// Fungsi login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Cek apakah pengguna ada di database
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !user) {
        return res.status(401).json({ error: 'User not found' });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Membuat token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
};


module.exports = {
    getUsers,
    createUser,
    loginUser
};
