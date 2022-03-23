import connectToDb from '../../../../lib/dbConnect.js';
import Post from '../../../../models/Post';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectToDb();
    const post = await Post.findOne({ id_: id });
    let index = post.likes.indexOf(req.body.username);
    post.likes.splice(index, 1);
    await post.save();
    return res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Could not unlike post.' });
  }
}
