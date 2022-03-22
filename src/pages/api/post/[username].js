import Post from '../../../models/Post'
import connectToDb from '../../../connectToDb'

export default async function (req, res) {
  await connectToDb()

  const {
    method,
    query: { username },
  } = req

  try {
    const userPosts = await Post.find({ username })
    res.status(200).json(userPosts)
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: 'Failed to fetch posts' })
  }
}
