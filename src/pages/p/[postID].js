import dbConnect from '../../lib/dbConnect.js';
import Post from '../../models/Post';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import User from '../../models/User';
import mongoose from 'mongoose';

export default function UserPost({ post, userData }) {
  /*
    Encountering a very strange bug where next.js Severless function will time-out if these UI components are not dynamically imported after the severless function finishes.
    */
  const MobilePost = dynamic(() =>
    import('../../components/post/MobilePost.jsx')
  );
  const DesktopPost = dynamic(() =>
    import('../../components/post/DesktopPost.jsx')
  );
  const Layout = dynamic(() => import('../../components/layouts/Layout.jsx'));

  // If user post cannot be found
  if (!post) {
    return (
      <Layout>
        <div className="my-10 mx-auto flex flex-col gap-y-5 px-10 text-center">
          <p className="text-2xl font-semibold">
            Sorry, this page is not available.
          </p>

          <p>
            The link you followed may be broken, or the page may have been
            removed.{' '}
            <Link href="/">
              <a>
                <span className="cursor-pointer text-blue-btn">
                  Click here to go back home.
                </span>
              </a>
            </Link>
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <MobilePost post={post} userData={userData} />
      <DesktopPost post={post} userData={userData} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  let _id = context.query.postID;

  if (mongoose.connection.readyState === 1) {
    try {
      let post = await Post.findOne({ _id });
      let user = await User.findOne({ username: post.username });

      if (!post) {
        return {
          props: {
            post: null,
            userData: null,
          },
        };
      }
      return {
        props: {
          post: JSON.parse(JSON.stringify(post)),
          userData: JSON.parse(JSON.stringify(user)),
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: {
          post: null,
          userData: null,
        },
      };
    }
  }
}
