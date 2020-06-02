const auth = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();


router.get('/', auth, async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = router;