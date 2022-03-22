import mongoose from 'mongoose'

const PostCommentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const PostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    caption: {
      type: String,
      default: '',
    },
    comments: [PostCommentSchema],
  },
  { timestamps: true }
)

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
