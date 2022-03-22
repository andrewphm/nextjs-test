import connectToDb from '../../../connectToDb'
import Post from '../../../models/Post'

export default async function (req, res) {
  await connectToDb()

  const { id } = req.query

  // Fetch a single post
  const fetchPost = async () => {
    if (!id)
      return res
        .status(400)
        .json({ succes: fail, message: 'No post was found' })

    try {
      let post = await Post.findOne({ _id: id })

      if (!post)
        return res
          .status(400)
          .json({ succes: fail, message: 'No post was found' })

      return res.status(200).json(post)
    } catch (error) {
      return res
        .status(400)
        .json({ succes: fail, message: 'No post was found' })
    }
  }

  // Create new post
  const handlePOSTMethod = async () => {
    if (!req.body)
      return res
        .status(400)
        .json({ success: false, message: 'No data/body provided.' })

    try {
      const newPost = new Post(req.body)
      const savedPost = await newPost.save()
      return res.status(200).json(savedPost)
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ success: false, message: 'Could not create post.' })
    }
  }

  switch (req.method) {
    case 'GET':
      return await fetchPost()
    case 'POST':
      return await handlePOSTMethod()
    default:
  }

  return res.status(200).json({ message: 'Failed to make post.' })
  // Create Post

  // Update Post

  // Delete
}
