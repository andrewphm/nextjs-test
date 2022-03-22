import connectToDb from '../../../../connectToDb'
import Post from '../../../../models/Post'

export default async function (req, res) {
  await connectToDb()

  const { id } = req.query

  try {
    const post = await Post.findOne({ id_: id })
    let index = post.likes.indexOf(req.body.username)
    post.likes.splice(index, 1)
    await post.save()
    return res.status(200).json(post.likes)
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Could not unlike post.' })
  }
}
