import dbConnect from '../../lib/dbConnect';
import mongoose from 'mongoose';
import User from '../../models/User';

export async function getServerSideProps(context) {
  await dbConnect();
  const userQuery = context.query.username;

  if (mongoose.connection.readyState === 1) {
    let userData = await User.findOne({ username: userQuery });

    if (!userData) {
      return {
        props: {
          userData: null,
        },
      };
    }

    return {
      props: {
        userData: JSON.parse(JSON.stringify(userData)),
      },
    };
  }
}

const Profile = ({ userData }) => {
  return <div>{JSON.stringify(userData)}</div>;
};

export default Profile;
