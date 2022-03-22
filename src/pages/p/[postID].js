import dbConnect from '../../lib/dbConnect.js';
import Post from '../../models/Post';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleChange = () => {
    setWindowSize((prev) => window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleChange);

    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);

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
      {/* Mobile render */}
      {windowSize < 767 && <MobilePost post={post} userData={userData} />}

      {/* Desktop render */}
      {windowSize > 767 && <DesktopPost post={post} userData={userData} />}
    </Layout>
  );
}

export async function getStaticPaths() {
  await dbConnect();

  let posts = await Post.find({});

  posts = JSON.parse(JSON.stringify(posts));
  const paths = posts.map((post) => ({
    params: { postID: post._id },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/api/'
      : 'https://nexttest.andrewpham.ca/api/';

  try {
    let res = await fetch(`${BASE_URL}/post?id=${params.postID}`);
    const post = await res.json();
    let userRes = await fetch(`${BASE_URL}/user/${post.username}`);
    let userData = await userRes.json();

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
        userData: JSON.parse(JSON.stringify(userData)),
      },
      revalidate: 5,
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
