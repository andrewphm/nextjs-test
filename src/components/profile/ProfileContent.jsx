import Image from 'next/image'
import { useState, useRef } from 'react'
import { Favorite, ModeComment } from '@mui/icons-material'
import Link from 'next/link'

const ProfileContent = ({ userPosts }) => {
  const [tab, setTab] = useState('posts')
  const tabRef = useRef(null)
  const mobileTabRef = useRef(null)

  const handleTabChange = (e) => {
    if (tabRef.current === e.currentTarget) return
    tabRef?.current.classList.remove(
      'border-t-black',
      'border-t-2',
      'text-black'
    )
    e.currentTarget.classList.add('border-t-black', 'border-t-2', 'text-black')
    tabRef.current = e.currentTarget
    setTab((prev) => tabRef.current.id)
  }

  const handleMobileTabChange = (e) => {
    if (mobileTabRef.current === e.currentTarget) return
    mobileTabRef?.current.classList.remove('text-blue-btn')
    e.currentTarget.classList.add('text-blue-btn')
    mobileTabRef.current = e.currentTarget
    setTab((prev) => mobileTabRef?.current.id)
  }

  return (
    <div className="mx-auto flex w-full flex-col border-neutral-300 md:max-w-4xl md:border-t">
      {/* Desktop Tab */}
      <div className="relative -top-[1px] mx-auto hidden w-full justify-center gap-x-10 pb-4 text-gray-500 md:flex">
        <div
          id="posts"
          onClick={handleTabChange}
          ref={tabRef}
          className="flex cursor-pointer items-center gap-x-1 border-t-2 border-t-black  pt-4 text-xs font-semibold text-black"
        >
          <svg
            aria-label=""
            color="currentColor"
            fill="currentColor"
            height="14"
            role="img"
            viewBox="0 0 24 24"
            width="14"
          >
            <rect
              fill="none"
              height="18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              width="18"
              x="3"
              y="3"
            ></rect>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="9.015"
              x2="9.015"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="14.985"
              x2="14.985"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="9.015"
              y2="9.015"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="14.985"
              y2="14.985"
            ></line>
          </svg>

          <p className="tracking-wide">POSTS</p>
        </div>
        <div
          id="tagged"
          onClick={handleTabChange}
          className="flex cursor-pointer items-center gap-x-1 pt-4 text-xs font-semibold"
        >
          <svg
            aria-label=""
            color="currentColor"
            fill="currentColor"
            height="14"
            role="img"
            viewBox="0 0 24 24"
            width="14"
          >
            <path
              d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <path
              d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <circle
              cx="12.072"
              cy="11.075"
              fill="none"
              r="3.556"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></circle>
          </svg>
          <p className="tracking-wide">TAGGED</p>
        </div>
      </div>

      {/* Mobile Tab */}
      <div className="relative mx-auto flex w-full justify-around border-b border-b-neutral-300 py-3 text-gray-500 xs:px-10 sm:px-14 md:hidden">
        <div
          onClick={handleMobileTabChange}
          id="posts"
          ref={mobileTabRef}
          className="flex max-w-[200px] cursor-pointer justify-center text-blue-btn"
        >
          <svg
            aria-label=""
            color="currentColor"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <rect
              fill="none"
              height="18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              width="18"
              x="3"
              y="3"
            ></rect>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="9.015"
              x2="9.015"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="14.985"
              x2="14.985"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="9.015"
              y2="9.015"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="14.985"
              y2="14.985"
            ></line>
          </svg>
        </div>

        <div
          id="tagged"
          className="flex max-w-[200px] cursor-pointer justify-center"
          onClick={handleMobileTabChange}
        >
          <svg
            aria-label=""
            color="currentColor"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <path
              d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <circle
              cx="12.072"
              cy="11.075"
              fill="none"
              r="3.556"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></circle>
          </svg>
        </div>
      </div>

      {/* No posts */}
      {tab === 'posts' && userPosts.length === 0 && (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-4 py-12">
            <svg
              aria-label=""
              color="currentColor"
              fill="currentColor"
              height="45"
              role="img"
              viewBox="0 0 24 24"
              width="45"
            >
              <path
                d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <circle
                cx="12.072"
                cy="11.075"
                fill="none"
                r="3.556"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
            </svg>
            <p className="text-xl font-light">No Posts</p>
          </div>
        </div>
      )}

      {/* Show posts */}
      {tab === 'posts' && userPosts.length > 0 && (
        <div className="mb-1 grid w-full grid-cols-3 gap-1 pt-1 md:gap-5 xl:gap-4">
          {userPosts?.map((item) => {
            return (
              <Link key={item._id} href={`/${item.username}/${item._id}`}>
                <a>
                  <div
                    key={item._id}
                    className="relative w-full cursor-pointer pt-[100%]"
                  >
                    <Image
                      layout="fill"
                      src={item.image}
                      className=""
                      objectFit="cover"
                    />

                    <div className="absolute top-0 bottom-0 right-0 left-0 flex h-full w-full bg-black bg-opacity-0 hover:bg-opacity-40">
                      <div className="flex h-full w-full flex-wrap items-center justify-center gap-x-3 text-base text-transparent hover:text-white">
                        <div className="flex gap-x-2">
                          <Favorite />
                          <p className="font-semibold">{item.likes.length}</p>
                        </div>
                        <div className="flex gap-x-2">
                          <ModeComment />
                          <p className="font-semibold">
                            {item.comments.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
      )}

      {/* Showed Tagged Photos */}
      {tab === 'tagged' && (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-4 py-12">
            <svg
              aria-label=""
              color="currentColor"
              fill="currentColor"
              height="45"
              role="img"
              viewBox="0 0 24 24"
              width="45"
            >
              <path
                d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <circle
                cx="12.072"
                cy="11.075"
                fill="none"
                r="3.556"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
            </svg>
            <p className="text-xl font-light">No Photos</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileContent
