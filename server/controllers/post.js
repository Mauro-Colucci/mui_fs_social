import cloudinary from "../middleware/cloudinary.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    let cloudinaryPicture;
    const { userId, description } = req.body;
    if (req.file) {
      //if doing update we need to add a new field in the schema to store the cloudinaryid so we can:
      //await cloudinary.uploader.destroy(post.cloudinaryId)
      cloudinaryPicture = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "muiSocial",
      });
    }
    const user = await User.findById(userId);
    //postschema should have an objectid type ref of user...
    await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: cloudinaryPicture.secure_url || "",
      likes: {},
      comments: [],
    });

    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
};
export const likePost = async (req, res) => {
  try {
    //a set with types.objectId for likes would simplify? todo: TESTING
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
