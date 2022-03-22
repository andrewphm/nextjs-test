import dbConnect from '../../../lib/dbConnect';
import mongoose from 'mongoose';
import Post from '../../../models/Post';
import User from '../../../models/User';

export async function getServerSideProps(context) {
  await dbConnect();
  const userQuery = context.query.username;

  if (mongoose.connection.readyState === 1) {
    let userData = await User.findOne({ username: userQuery });
    let userPosts = await Post.find({ username: userQuery });

    console.log(userData);
    console.log(userPosts);

    if (!userData) {
      return {
        props: {
          userData: null,
          userPosts: [],
        },
      };
    }

    return {
      props: {
        userData: JSON.parse(JSON.stringify(userData)),
        userPosts: JSON.parse(JSON.stringify(userPosts)),
      },
    };
  }

  return {
    props: {
      userData: null,
      userPosts: [],
    },
  };
}

export default function Profile({ userData, userPosts }) {
  // If user cannot be found.
  return (
    <div>
      <p>{JSON.stringify(userData)}</p>
      <br></br>
      <p>{JSON.stringify(userData)}</p>
    </div>
  );
}
