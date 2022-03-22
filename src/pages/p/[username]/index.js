import dbConnect from '../../../lib/dbConnect';
import mongoose from 'mongoose';
import Post from '../../../models/Post';
import User from '../../../models/User';
import dynamic from 'next/dynamic';
import ProfileContent from '~/components/profile/ProfileContent.jsx';

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
  console.log(userData);
  console.log(userPosts);

  const ProfileInfo = dynamic(() =>
    import('../../../components/profile/ProfileInfo.jsx')
  );

  // const ProfileContent = dynamic(() =>
  //   import('../../../components/profile/ProfileContent.jsx')
  // );

  const Layout = dynamic(() =>
    import('../../../components/layouts/Layout.jsx')
  );

  return (
    <Layout>
      <section className="min-h-[80vh]">
        <ProfileInfo userPosts={userPosts} userData={userData} />
        <ProfileContent userPosts={userPosts} />
      </section>
    </Layout>
  );
}
