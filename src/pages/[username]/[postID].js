import Layout from '../../components/layouts/Layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import MobilePost from '../../components/post/MobilePost';
import DesktopPost from '../../components/post/DesktopPost';

const UserPost = ({ post, userData }) => {
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
};

export default UserPost;
