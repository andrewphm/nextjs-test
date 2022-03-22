import connectToDb from '../../../lib/dbConnect.js';
import User from '../../../models/User';

export default async function handler(req, res) {
  const {
    method,
    query: { username },
  } = req;

  try {
    await connectToDb();
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Could not find user.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: 'Something went wrong, please try again.',
    });
  }
}
