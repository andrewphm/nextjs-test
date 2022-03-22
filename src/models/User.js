import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      maxLength: [20, 'Name cannot be more than 20 characters'],
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.'],
    },
    image: {
      type: String,
      default: '',
    },
    following: {
      type: Array,
      default: ['Demo'],
    },
    followers: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
