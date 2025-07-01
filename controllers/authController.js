const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


exports.registerUser = async (req, res) => {
    const { name, email, phone, course, year, role, password, confirmPassword } = req.body;

    if (!name || !email || !phone || !course || !year || !role || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            phone,
            course,
            year,
            role,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Registration successful, please login' });
    } catch (err) {
        res.status(500).json({ error: 'Server error during registration' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, } });
    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
