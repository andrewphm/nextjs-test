import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useState } from 'react'
import API from '../API'

const usePostComment = (setComments) => {
  const user = useSelector((state) => state.user.currentUser)
  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState('')
  const router = useRouter()
  const {
    query: { postID },
  } = router

  const handleCommentClick = async (e) => {
    e.preventDefault()

    if (!user) {
      return router.push('/login')
    }

    let userComment = {
      username: user.username,
      image: user.image,
      comment,
    }

    setIsLoading((prev) => !prev)
    try {
      await API.commentOnPost(postID, userComment)
    } catch (error) {
      console.log(error)
      setIsLoading((prev) => !prev)
    }

    setComments((prev) => {
      return [userComment, ...prev]
    })

    setComment((prev) => '')
    setIsLoading((prev) => !prev)
  }

  return { comment, setComment, isLoading, setIsLoading, handleCommentClick }
}

export default usePostComment
