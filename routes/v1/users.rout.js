const express = require("express");
const userController = require("../../controllers/users.controller");
const router = express.Router();
// router.get("/users", (req, res) => {
//     res.send("user got");
// });

// router.post("/users", (req, res) => {
//     res.send("user created")
// });

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.postAllUsers)

module.exports = router;