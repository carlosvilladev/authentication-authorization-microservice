const auth = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();


router.get('/', auth, async (req, res) => {
   res.send(req.user);
});

module.exports = router;