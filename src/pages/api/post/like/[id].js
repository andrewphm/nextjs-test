import connectToDb from '../../../../connectToDb'
import Post from '../../../../models/Post'

export default async function (req, res) {
  await connectToDb()

  const { id } = req.query

  try {
    const post = await Post.findOne({ id_: id })
    if (post.likes.inclues(req.body.username)) {
      return res.status(200).json(post.likes)
    }

    post.likes.push(req.body.username)
    await post.save()

    return res.status(200).json(post.likes)
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Could not like post.' })
  }
}
