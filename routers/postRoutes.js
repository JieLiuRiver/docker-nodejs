const express = require("express");

const postController = require("../controllers/postContorller");

const router = express.Router()

router
  .route("/")
  .get(postController.getALlPosts)
  .post(postController.createPost);

router
  .route("/:id ")
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deltePost);


module.exports = router