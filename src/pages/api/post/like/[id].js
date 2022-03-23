import connectToDb from '../../../../lib/dbConnect.js';
import Post from '../../../../models/Post';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectToDb();
    const post = await Post.findOne({ id_: id });
    if (post.likes.includes(req.body.username)) {
      return res.status(200).json(post.likes);
    }

    post.likes.push(req.body.username);
    await post.save();

    return res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Could not like post.' });
  }
}
