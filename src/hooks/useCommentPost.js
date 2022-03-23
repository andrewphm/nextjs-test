import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import API from '../apiCalls';

const usePostComment = (setComments) => {
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const router = useRouter();
  const {
    query: { postID },
  } = router;

  const handleCommentClick = async (e) => {
    e.preventDefault();

    if (!user) {
      return router.push('/login');
    }

    let userComment = {
      username: user.username,
      image: user.image,
      comment,
    };

    setIsLoading((prev) => !prev);
    try {
      let { data } = await API.commentOnPost(postID, userComment);
      setComments((prev) => {
        return [...prev, data];
      });

      setComment((prev) => '');
      setIsLoading((prev) => !prev);
    } catch (error) {
      console.log(error);
      setIsLoading((prev) => !prev);
      setComment((prev) => '');
    }
  };

  return { comment, setComment, isLoading, setIsLoading, handleCommentClick };
};

export default usePostComment;
