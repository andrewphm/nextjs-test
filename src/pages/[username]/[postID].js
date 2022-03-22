import Layout from '../../components/layouts/Layout'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import MobilePost from '../../components/post/MobilePost'
import DesktopPost from '../../components/post/DesktopPost'
import axios from 'axios'

const UserPost = ({ post, userData }) => {
  // If user post cannot be found
  if (!post) {
    return (
      <Layout>
        <div className="my-10 mx-auto flex flex-col gap-y-5 px-10 text-center">
          <p className="text-2xl font-semibold">
            Sorry, this page isn't available.
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
    )
  }

  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleChange = () => {
    setWindowSize((prev) => window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleChange)

    return () => {
      window.removeEventListener('resize', handleChange)
    }
  }, [])

  return (
    <Layout>
      {/* Mobile render */}
      {windowSize < 767 && <MobilePost post={post} userData={userData} />}

      {/* Desktop render */}
      {windowSize > 767 && <DesktopPost post={post} userData={userData} />}
    </Layout>
  )
}

export default UserPost

export const getServerSideProps = async (context) => {
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/'
      : 'https://margatsni.andrewpham.ca/api/'

  let userQuery = context.query.username
  let postID = context.query.postID

  try {
    console.log('Attempting to fetch post')
    let { data: post } = await axios.get(`${BASE_URL}post?id=${postID}`)
    let {
      data: { username, image },
    } = await axios.get(`${BASE_URL}user/${userQuery}`)

    return {
      props: {
        post: post || null,
        userData: { username, image },
      },
    }
  } catch (error) {
    return {
      props: {
        post: null,
      },
    }
  }
}
