const express = require("express");
const router = express.Router();

router.get("/posts", async (req, res) => {
  console.log(`this is a post request ${req}`);
  res.send("testing");
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

module.exports = router;
