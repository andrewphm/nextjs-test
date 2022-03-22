import { Cancel, Search } from '@mui/icons-material';
import { useRef, useState } from 'react';
import logo from '../../../public/images/logo.png';
import nopfp from '../../../public/images/nopfp.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { clearCurrentUser } from '../../redux/userRedux';
import API from '../../apiCalls';
import * as ROUTE from '../../constants/routes';
import NewPost from '../newpost/NewPost';
import { useRouter } from 'next/router';
import React from 'react';

const Header = ({ currentTab }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [tab, setTab] = useState(currentTab);
  const [inputIsActive, setInputIsActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const menuRef = useRef(null);
  const menuRefMobile = useRef(null);
  const dispatch = useDispatch();
  const [showNewPost, setShowNewPost] = useState(false);
  const router = useRouter();

  const handleMenuFocus = () => {
    setTab((prev) => 'user');

    menuRefMobile.current.classList.toggle('opacity-0');
    menuRefMobile?.current?.classList.toggle('transform-none');
    menuRef?.current?.classList.toggle('opacity-0');
    menuRef?.current?.classList.toggle('transform-none');
  };

  const handleMenuBlur = () => {
    setTimeout(() => {
      menuRef?.current?.classList.toggle('opacity-0');
      menuRef?.current?.classList.toggle('transform-none');
      menuRefMobile?.current.classList.toggle('opacity-0');
      menuRefMobile?.current?.classList.toggle('transform-none');
      setTab((prev) => '/');
    }, 100);
  };

  const handleSearchClose = () => {
    setSearchInput((prev) => '');
    setInputIsActive((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      const data = await API.userSignOut();

      if (data.status === 200) {
        dispatch(clearCurrentUser());
        if (router.pathname === '/') {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex min-h-[60px] w-full items-center justify-center border bg-white">
        {/* Desktop devices */}
        <div className="hidden w-full max-w-6xl items-center justify-between gap-x-2 px-5 md:flex">
          {/* Logo */}

          <Link href={ROUTE.DASHBOARD}>
            <a>
              <div className="relative flex h-[35px] w-[113px] min-w-[113px] cursor-pointer">
                <Image src={logo} layout="fill" priority={true} alt="" />
              </div>
            </a>
          </Link>

          {/* Search Bar */}
          <div
            onClick={() => setInputIsActive(true)}
            className="min-w-[150px] max-w-[270px] flex-grow"
          >
            <div className="flex flex-nowrap items-center rounded-lg bg-[#EFEFEF] py-1 px-2 pl-4 text-gray-500">
              {!inputIsActive && (
                <div className="pl-3 pr-2">
                  <Search />
                </div>
              )}
              <input
                tabIndex={0}
                onFocus={() => setInputIsActive((prev) => true)}
                onBlur={handleSearchClose}
                className="w-full bg-transparent text-black placeholder:text-gray-500 focus:outline-none"
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput((prev) => e.target.value)}
              />

              {inputIsActive && (
                <div
                  className="flex items-center"
                  onClickCapture={handleSearchClose}
                >
                  <Cancel className="cursor-pointer" fontSize="small" />
                </div>
              )}
            </div>
          </div>

          {/* Nav */}
          {user ? (
            <nav className="relative flex max-w-[228px] items-center gap-x-4">
              <Link href={ROUTE.DASHBOARD}>
                <a tabIndex={0}>
                  <div
                    className="cursor-pointer "
                    onClick={() => setTab((prev) => '/')}
                  >
                    {tab === '/' ? (
                      <svg
                        aria-label="Home"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
                      </svg>
                    ) : (
                      <svg
                        aria-label="Home"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path
                          d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    )}
                  </div>
                </a>
              </Link>

              <Link href={ROUTE.INBOX}>
                <a>
                  <div
                    className="cursor-pointer "
                    onClick={() => setTab((prev) => '/direct/inbox')}
                  >
                    {tab === '/direct/inbox' ? (
                      <svg
                        aria-label="Direct"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path
                          d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        aria-label="Direct"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                      </svg>
                    )}
                  </div>
                </a>
              </Link>

              <div
                tabIndex={0}
                className="cursor-pointer "
                onClick={() => {
                  setTab((prev) => 'add');
                  setShowNewPost((prev) => true);
                }}
              >
                {tab === 'add' ? (
                  <svg
                    aria-label="New Post"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M12.003 5.545l-.117.006-.112.02a1 1 0 00-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 00-.877.876L5.545 12l.007.117a1 1 0 00.877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 00.876.877l.117.007.117-.007a1 1 0 00.876-.877l.007-.116V13h4.452l.116-.007a1 1 0 00.877-.876l.007-.117-.007-.117a1 1 0 00-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 00-.876-.877zM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1z"></path>
                  </svg>
                ) : (
                  <svg
                    aria-label="New Post"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="6.545"
                      x2="17.455"
                      y1="12.001"
                      y2="12.001"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="12.003"
                      x2="12.003"
                      y1="6.545"
                      y2="17.455"
                    ></line>
                  </svg>
                )}
              </div>

              <Link href={ROUTE.EXPLORE}>
                <a tabIndex={0}>
                  <div
                    className="cursor-pointer "
                    onClick={() => setTab((prev) => '/explore')}
                  >
                    {tab === '/explore' ? (
                      <svg
                        aria-label="Find People"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M13.173 13.164l1.491-3.829-3.83 1.49zM12.001.5a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012.001.5zm5.35 7.443l-2.478 6.369a1 1 0 01-.57.569l-6.36 2.47a1 1 0 01-1.294-1.294l2.48-6.369a1 1 0 01.57-.569l6.359-2.47a1 1 0 011.294 1.294z"></path>
                      </svg>
                    ) : (
                      <svg
                        aria-label="Find People"
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polygon
                          fill="none"
                          points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                        <polygon
                          fillRule="evenodd"
                          points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                        ></polygon>
                        <circle
                          cx="12.001"
                          cy="12.005"
                          fill="none"
                          r="10.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                      </svg>
                    )}
                  </div>
                </a>
              </Link>

              <div
                tabIndex={0}
                className="cursor-pointer "
                onClick={() => setTab((prev) => 'favorite')}
              >
                {tab === 'favorite' ? (
                  <svg
                    aria-label="Activity Feed"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                  </svg>
                ) : (
                  <svg
                    aria-label="Activity Feed"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                  </svg>
                )}
              </div>

              <div
                onBlur={handleMenuBlur}
                tabIndex={0}
                onFocus={handleMenuFocus}
                className={`flex cursor-pointer items-center justify-center rounded-full ${
                  tab === 'user' ? 'border border-black p-[2px]' : ''
                }`}
              >
                <div className="relative h-[28px] w-[28px]">
                  <Image
                    src={user?.image ? user.image : nopfp}
                    className="rounded-full"
                    layout="fill"
                    objectFit="contain"
                    alt=""
                  />
                </div>
              </div>

              {user && (
                <div
                  ref={menuRef}
                  className="absolute top-[50px] -right-3 z-10 flex w-56 -translate-y-96  rounded-md bg-white opacity-0 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.0975)] transition-opacity duration-500 ease-linear"
                >
                  <ul className="h-full w-full text-sm">
                    <Link href={`/${user.username}`}>
                      <a>
                        <li className="flex cursor-pointer items-center gap-x-2 rounded-t-md py-[10px] px-4 hover:bg-gray-100">
                          <svg
                            aria-label="Profile"
                            color="#262626"
                            fill="#262626"
                            height="16"
                            role="img"
                            viewBox="0 0 24 24"
                            width="16"
                          >
                            <circle
                              cx="12.004"
                              cy="12.004"
                              fill="none"
                              r="10.5"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="2"
                            ></circle>
                            <path
                              d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="2"
                            ></path>
                            <circle
                              cx="12.006"
                              cy="9.718"
                              fill="none"
                              r="4.109"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="2"
                            ></circle>
                          </svg>
                          <p>Profile</p>
                        </li>
                      </a>
                    </Link>
                    <li className="flex cursor-pointer items-center gap-x-2 py-[10px] px-4 hover:bg-gray-100">
                      <svg
                        aria-label="Saved"
                        color="#262626"
                        fill="#262626"
                        height="16"
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <polygon
                          fill="none"
                          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                      </svg>
                      <p>Saved</p>
                    </li>
                    <li className="flex cursor-pointer items-center gap-x-2 py-[10px] px-4 hover:bg-gray-100">
                      <svg
                        aria-label="Settings"
                        color="#262626"
                        fill="#262626"
                        height="16"
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="8.635"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></circle>
                        <path
                          d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                      <p>Settings</p>
                    </li>
                    <li
                      onClick={handleSignOut}
                      className="flex cursor-pointer items-center gap-x-2 rounded-b-md border-t py-[10px] px-5 hover:bg-gray-100"
                    >
                      <p>Sign Out</p>
                    </li>
                  </ul>

                  <div className="absolute right-[17px] -top-[9px] -z-10 h-4 w-4 rotate-45 border-l border-t bg-white"></div>
                </div>
              )}
            </nav>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link href={ROUTE.LOGIN}>
                <a>
                  <button className="whitespace-nowrap rounded-md bg-blue-btn px-3 py-1 font-semibold text-white">
                    Log In
                  </button>
                </a>
              </Link>

              <Link href={ROUTE.SIGNUP}>
                <a>
                  <button className="whitespace-nowrap font-semibold text-blue-btn">
                    Sign Up
                  </button>
                </a>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile devices */}
        <div className="flex w-full items-center justify-between px-5 sm:px-7 md:hidden">
          <Link href={ROUTE.DASHBOARD}>
            <a>
              <div className="relative flex h-[28px] w-[98px] min-w-[113px] cursor-pointer">
                <Image src={logo} layout="fill" alt="" />
              </div>
            </a>
          </Link>
          {user ? (
            <div
              tabIndex={0}
              onFocus={handleMenuFocus}
              onBlur={handleMenuBlur}
              className={`flex cursor-pointer items-center justify-center
              rounded-full`}
            >
              <div className="relative h-[32px] w-[32px]">
                <Image
                  src={user?.image ? user.image : nopfp}
                  className="rounded-full"
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link href={ROUTE.LOGIN}>
                <a>
                  <button className="whitespace-nowrap rounded-md bg-blue-btn px-3 py-1 text-sm font-semibold text-white">
                    Log In
                  </button>
                </a>
              </Link>

              <Link href={ROUTE.SIGNUP}>
                <a>
                  <button className="whitespace-nowrap text-sm font-semibold text-blue-btn">
                    Sign Up
                  </button>
                </a>
              </Link>
            </div>
          )}

          {user && (
            <div
              ref={menuRefMobile}
              className="absolute top-[64px] right-[13px] z-10 flex w-56 -translate-y-96 rounded-md bg-white opacity-0 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.0975)] transition-opacity duration-500 ease-linear sm:right-[20px]"
            >
              <ul className="h-full w-full text-sm">
                <Link href={`/${user.username}`}>
                  <a>
                    <li className="flex cursor-pointer items-center gap-x-2 rounded-t-md py-[10px] px-4 hover:bg-gray-100">
                      <svg
                        aria-label="Profile"
                        color="#262626"
                        fill="#262626"
                        height="16"
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <circle
                          cx="12.004"
                          cy="12.004"
                          fill="none"
                          r="10.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        ></circle>
                        <path
                          d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        ></path>
                        <circle
                          cx="12.006"
                          cy="9.718"
                          fill="none"
                          r="4.109"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        ></circle>
                      </svg>
                      <p>Profile</p>
                    </li>
                  </a>
                </Link>
                <li className="flex cursor-pointer items-center gap-x-2 py-[10px] px-4 hover:bg-gray-100">
                  <svg
                    aria-label="Saved"
                    color="#262626"
                    fill="#262626"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <polygon
                      fill="none"
                      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></polygon>
                  </svg>
                  <p>Saved</p>
                </li>
                <li className="flex cursor-pointer items-center gap-x-2 py-[10px] px-4 hover:bg-gray-100">
                  <svg
                    aria-label="Settings"
                    color="#262626"
                    fill="#262626"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      fill="none"
                      r="8.635"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></circle>
                    <path
                      d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <p>Settings</p>
                </li>
                <li
                  onClick={handleSignOut}
                  className="flex cursor-pointer items-center gap-x-2 rounded-b-md border-t py-[10px] px-5 hover:bg-gray-100"
                >
                  <p>Sign Out</p>
                </li>
              </ul>

              <div className="absolute right-[17px] -top-[9px] -z-10 h-4 w-4 rotate-45 border-l border-t bg-white"></div>
            </div>
          )}
        </div>
      </header>

      {/* Only shown on mobile devices */}
      {user && (
        <nav className="fixed bottom-0 z-50 flex min-h-[60px] w-full border-t bg-white shadow-lg md:hidden">
          <div className="relative flex w-full items-center justify-around">
            <Link href={ROUTE.DASHBOARD}>
              <a>
                <div
                  className="cursor-pointer "
                  onClick={() => setTab((prev) => '/')}
                >
                  {tab === '/' ? (
                    <svg
                      aria-label="Home"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
                    </svg>
                  ) : (
                    <svg
                      aria-label="Home"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  )}
                </div>
              </a>
            </Link>

            <Link href={ROUTE.INBOX}>
              <a>
                <div
                  className="cursor-pointer "
                  onClick={() => setTab((prev) => '/direct/inbox')}
                >
                  {tab === '/direct/inbox' ? (
                    <svg
                      aria-label="Direct"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      aria-label="Direct"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="22"
                        x2="9.218"
                        y1="3"
                        y2="10.083"
                      ></line>
                      <polygon
                        fill="none"
                        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></polygon>
                    </svg>
                  )}
                </div>
              </a>
            </Link>

            <div
              className="cursor-pointer "
              onClick={() => {
                setTab((prev) => 'add');
                setShowNewPost((prev) => true);
              }}
            >
              {tab === 'add' ? (
                <svg
                  aria-label="New Post"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M12.003 5.545l-.117.006-.112.02a1 1 0 00-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 00-.877.876L5.545 12l.007.117a1 1 0 00.877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 00.876.877l.117.007.117-.007a1 1 0 00.876-.877l.007-.116V13h4.452l.116-.007a1 1 0 00.877-.876l.007-.117-.007-.117a1 1 0 00-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 00-.876-.877zM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1z"></path>
                </svg>
              ) : (
                <svg
                  aria-label="New Post"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="6.545"
                    x2="17.455"
                    y1="12.001"
                    y2="12.001"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="12.003"
                    x2="12.003"
                    y1="6.545"
                    y2="17.455"
                  ></line>
                </svg>
              )}
            </div>

            <Link href={ROUTE.EXPLORE}>
              <a>
                <div
                  className="cursor-pointer "
                  onClick={() => setTab((prev) => '/explore')}
                >
                  {tab === '/explore' ? (
                    <svg
                      aria-label="Find People"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M13.173 13.164l1.491-3.829-3.83 1.49zM12.001.5a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012.001.5zm5.35 7.443l-2.478 6.369a1 1 0 01-.57.569l-6.36 2.47a1 1 0 01-1.294-1.294l2.48-6.369a1 1 0 01.57-.569l6.359-2.47a1 1 0 011.294 1.294z"></path>
                    </svg>
                  ) : (
                    <svg
                      aria-label="Find People"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <polygon
                        fill="none"
                        points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></polygon>
                      <polygon
                        fillRule="evenodd"
                        points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                      ></polygon>
                      <circle
                        cx="12.001"
                        cy="12.005"
                        fill="none"
                        r="10.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></circle>
                    </svg>
                  )}
                </div>
              </a>
            </Link>

            <div
              className="cursor-pointer "
              onClick={() => setTab((prev) => 'favorite')}
            >
              {tab === 'favorite' ? (
                <svg
                  aria-label="Activity Feed"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              ) : (
                <svg
                  aria-label="Activity Feed"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
                </svg>
              )}
            </div>
          </div>
        </nav>
      )}
      {showNewPost && <NewPost setShowNewPost={setShowNewPost} />}
    </>
  );
};

export default Header;
