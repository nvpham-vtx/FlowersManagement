var express = require("express");
var router = express.Router();
var db = require("../db_setup/users");

router.get("/api/users", db.getAllUsers);
router.post("/api/signin", db.authenticateUser);
router.post("/api/users", db.createUser);
router.get("/api/users/:email", db.getUserById);
router.put("/api/users/:email", db.updateUserById);
router.delete("/api/users/:email", db.deleteUserById);
module.exports = router;