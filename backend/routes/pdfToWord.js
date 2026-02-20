const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ msg: "PDF to Word API connected" });
});

module.exports = router;
