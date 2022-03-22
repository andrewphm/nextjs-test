import { useState } from 'react';
import API from '../apiCalls';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const useLikePost = (post) => {
  const user = useSelector((state) => state.user.currentUser);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(
    likes.includes(user?.username) || false
  );

  const router = useRouter();

  const handleLikeClick = async () => {
    if (!user) return router.push('/login');

    if (!isLiked) {
      try {
        setIsLiked((prev) => !prev);
        const { data } = await API.likePost(post._id, {
          username: user.username,
        });
        setLikes((prev) => data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setIsLiked((prev) => !prev);
        const { data } = await API.unlikePost(post._id, {
          username: user.username,
        });
        setLikes((prev) => data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { isLiked, likes, handleLikeClick };
};

export default useLikePost;
