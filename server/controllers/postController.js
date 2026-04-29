import Post from "../models/Post.js";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const clampRating = (value) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return Math.min(5, Math.max(0, numeric));
};

const withUniqueSlug = async (title, postId = null) => {
  const base = slugify(title);
  let slug = base;
  let count = 1;

  while (true) {
    const found = await Post.findOne({
      slug,
      ...(postId ? { _id: { $ne: postId } } : {})
    });
    if (!found) break;
    slug = `${base}-${count}`;
    count += 1;
  }
  return slug;
};

export const createPost = async (req, res) => {
  const body = req.body;
  const tags = (body.tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const slug = await withUniqueSlug(body.title);
  const image = req.file ? `/uploads/${req.file.filename}` : body.image || "";

  const post = await Post.create({
    ...body,
    tags,
    rating: clampRating(body.rating),
    slug,
    image
  });

  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const existing = await Post.findById(id);
  if (!existing) return res.status(404).json({ message: "Post not found" });

  const shouldUpdateSlug =
    req.body.title && req.body.title.trim() !== existing.title;
  const slug = shouldUpdateSlug
    ? await withUniqueSlug(req.body.title, id)
    : existing.slug;

  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
  const tags = req.body.tags
    ? req.body.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : existing.tags;

  const updated = await Post.findByIdAndUpdate(
    id,
    {
      ...req.body,
      tags,
      rating:
        req.body.rating === undefined || req.body.rating === ""
          ? existing.rating
          : clampRating(req.body.rating),
      ...(image ? { image } : {}),
      slug
    },
    { new: true, runValidators: true }
  );

  res.json(updated);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const deleted = await Post.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: "Post not found" });
  res.json({ message: "Post deleted" });
};

export const getPosts = async (req, res) => {
  const { category, search, limit = 20, page = 1 } = req.query;
  const query = {};
  if (category) query.category = category;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Post.countDocuments(query)
  ]);

  res.json({
    items,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit))
  });
};

export const getPostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.views += 1;
  post.trendingScore += 1;
  await post.save();

  res.json(post);
};

export const getTrendingPosts = async (_req, res) => {
  const posts = await Post.find().sort({ trendingScore: -1, createdAt: -1 }).limit(6);
  res.json(posts);
};

export const getPopularPosts = async (_req, res) => {
  const posts = await Post.find().sort({ views: -1, createdAt: -1 }).limit(6);
  res.json(posts);
};
