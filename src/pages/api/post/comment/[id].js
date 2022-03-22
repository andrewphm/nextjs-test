import Post from '../../../../models/Post'
import connectToDb from '../../../../connectToDb'

export default async function (req, res) {
  await connectToDb()

  const {
    method,
    query: { id },
  } = req

  try {
    const post = await Post.findOne({ _id: id })

    post.comments.push(req.body)

    const savedPost = await post.save()

    return res.status(200).json(savedPost)
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Failed to post comment.' })
  }
}
