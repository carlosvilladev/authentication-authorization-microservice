const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const auth = require("../middlewares/auth.middleware");

router.post("/authenticate", async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({ username: username });
    
    if(!user) return res.json({ success: false, message: 'Authentication failed. User not found.' });
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) return res.json({ success: false, message: 'Authentication failed. Wrong password.' });

    const token = user.generateAuthToken();
    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/verify', auth, (req, res) => {
    res.json(req.user);
});

module.exports = router;