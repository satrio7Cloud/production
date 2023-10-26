const express = require("express");
const {
  requireSignIn,
  updateUseController,
} = require("../controllers/userControllers");
const {
  createPostController,
  getAllPostController,
  getUserPostController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

// router Object
const router = express.Router();

// Create Post || POST
router.post("/create-post", requireSignIn, createPostController);

// Get All Post || GET
router.get("/get-all-post", getAllPostController);

// Get User Post || GET
router.get("/get-user-post", requireSignIn, getUserPostController);

// delete Post || DELETE
router.delete("/delete-post/:id", requireSignIn, deletePostController);

// update || PUT
router.put("/update-post/:id", requireSignIn, updatePostController);

// export
module.exports = router;
