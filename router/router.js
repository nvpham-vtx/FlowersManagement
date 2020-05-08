var express = require("express");
var router = express.Router();
var db = require("../db_setup/users");

router.get("/api/users", db.getAllUsers);
router.post("/api/signin", db.authenticateUser);
module.exports = router;