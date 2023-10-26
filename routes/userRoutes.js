const express = require("express");
const {
  registerController,
  loginController,
  updateUseController,
  requireSignIn,
} = require("../controllers/userControllers");

// router object
const router = express.Router();

// routes
// Register || POST
router.post("/register", registerController);

// Login || Post
router.post("/login", loginController);

// Update || PUT
router.put("/update-user", requireSignIn, updateUseController);

// export
module.exports = router;
