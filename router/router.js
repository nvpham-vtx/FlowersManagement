var express = require("express");
var router = express.Router();
var db = require("../db_setup/users");

router.get("/api/user", db.getAllUsers);
module.exports = router;