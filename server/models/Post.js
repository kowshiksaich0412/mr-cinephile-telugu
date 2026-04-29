import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["review", "news", "trailer", "list"]
    },
    summary: { type: String, default: "" },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    author: { type: String, default: "Mr Cinephile Telugu" },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    trendingScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
