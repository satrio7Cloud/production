const mongoose = require("mongoose");

// Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please Add Post Title"],
    },
    description: {
      type: String,
      require: [true, "Please Add Post Description"],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      reqiere: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
