import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    name: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    approved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
