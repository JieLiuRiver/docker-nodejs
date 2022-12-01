const express = require("express");
const protect = require('../middleware/authMiddleware')

const postController = require("../controllers/postContorller");

const router = express.Router()

router
  .route("/")
  .get(postController.getALlPosts)
  .post(protect, postController.createPost);

router
  .route("/:id ")
  .get(postController.getOnePost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deltePost);


module.exports = router