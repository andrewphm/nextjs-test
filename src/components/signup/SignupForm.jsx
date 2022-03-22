import { useState, useEffect, useRef } from 'react'
import logo from '../../../public/images/logo.png'
import googleBadge from '../../../public/images/login/googleplaybadge.png'
import appleBadge from '../../../public/images/login/applestorebadge.png'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook } from '@mui/icons-material'
import API from '../../API'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginFailure, loginSuccess } from '../../redux/userRedux'

const initialForm = {
  email: '',
  fullName: '',
  username: '',
  password: '',
}

const LoginForm = () => {
  const [form, setForm] = useState(initialForm)
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  // Focus input
  useEffect(() => {
    document.title = 'Signup - Instagram'

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleFormChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(loginStart())
      const res = await API.userSignup(form)
      dispatch(loginSuccess(res.data))
      window.location.reload()
    } catch (error) {
      // Display error message
      dispatch(loginFailure(error.response.data.error))
    }
  }

  return (
    <div className="flex w-[350px] flex-col gap-y-3">
      <div className="flex w-full flex-col items-center p-6 xs:border xs:bg-white">
        <div className="relative h-[20px] w-40 p-9">
          <Image src={logo} layout="fill" objectFit="contain" />
        </div>

        <div className="mt-2 mb-4">
          <p className="text-center text-sm font-semibold text-gray-500">
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-y-2"
        >
          <input type="hidden" value="prayer" />

          <div
            className={`relative w-full rounded-sm border bg-white xs:bg-[#fafafa] ${
              form.email ? 'pt-[9px] pb-[1px]' : 'py-[5px]'
            }`}
          >
            <input
              aria-label="Enter your email address"
              className="w-full bg-transparent px-2 text-sm font-light focus:outline-none"
              id="email"
              name="email"
              type="email"
              required
              onChange={handleFormChange}
              value={form.email}
              autoFocus
              autoComplete="new-email"
              ref={inputRef}
            />
            <label
              htmlFor="email"
              className={
                form.email
                  ? 'absolute top-[1px] left-2 text-[10px] font-normal text-gray-400 transition-all'
                  : 'absolute top-[6px] left-2 text-sm font-normal text-gray-400 transition-all'
              }
            >
              Email
            </label>
          </div>

          <div
            className={`relative w-full rounded-sm border bg-white xs:bg-[#fafafa] ${
              form.fullName ? 'pt-[9px] pb-[1px]' : 'py-[5px]'
            }`}
          >
            <input
              className="w-full bg-transparent px-2 text-sm font-light focus:outline-none"
              aria-label="Enter your full name"
              id="fullName"
              name="fullName"
              type="text"
              onChange={handleFormChange}
              value={form.fullName}
              autoComplete="new-fullname"
            />
            <label
              htmlFor="email"
              className={
                form.fullName
                  ? 'absolute top-[1px] left-2 text-[10px] font-normal text-gray-400 transition-all'
                  : 'absolute top-[6px] left-2 text-sm font-normal text-gray-400 transition-all'
              }
            >
              Full name
            </label>
          </div>

          <div
            className={`relative w-full rounded-sm border bg-white xs:bg-[#fafafa] ${
              form.username ? 'pt-[9px] pb-[1px]' : 'py-[5px]'
            }`}
          >
            <input
              aria-label="Enter a username"
              className="w-full bg-transparent px-2 text-sm font-light focus:outline-none"
              id="username"
              name="username"
              type="text"
              onChange={handleFormChange}
              value={form.username}
              autoComplete="new-username"
            />
            <label
              htmlFor="username"
              className={
                form.username
                  ? 'absolute top-[1px] left-2 text-[10px] font-normal text-gray-400 transition-all'
                  : 'absolute top-[6px] left-2 text-sm font-normal text-gray-400 transition-all'
              }
            >
              Username
            </label>
          </div>

          <div
            className={`relative flex w-full rounded-sm border bg-white xs:bg-[#fafafa] ${
              form.password ? 'pt-[9px] pb-[1px]' : 'py-[5px]'
            }`}
          >
            <input
              aria-label="Enter a password"
              className="w-full bg-transparent px-2 text-sm font-light focus:outline-none"
              id="password"
              name="password"
              type={isVisible ? 'text' : 'password'}
              onChange={handleFormChange}
              value={form.password}
              autoComplete="new-password"
            />

            {form.password && (
              <p
                onClick={() => setIsVisible((prev) => !prev)}
                className="relative bottom-1 cursor-pointer pr-3 text-sm"
              >
                Show
              </p>
            )}

            <label
              htmlFor="Password"
              className={
                form.password
                  ? 'absolute top-[1px] left-2 text-[10px] font-normal text-gray-400 transition-all'
                  : 'absolute top-[6px] left-2 text-sm font-normal text-gray-400 transition-all'
              }
            >
              Password
            </label>
          </div>

          <button
            className={`mt-3 w-full rounded-md bg-[#0095f6] py-[2px] font-medium text-white shadow-sm ease-out hover:scale-[1.01] ${
              form.username && form.password && form.email && form.fullName
                ? 'hover:shadow-md'
                : 'cursor-not-allowed opacity-50'
            }`}
            disabled={
              form.username && form.password && form.email && form.fullName
                ? false
                : true
            }
          >
            {user.isFetching ? (
              <div className="flex justify-center">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <span>Sign up</span>
            )}
          </button>

          <button className="w-full rounded-md border bg-[linear-gradient(90deg,_#6F019C_0%,_#C6017E_135.12%)_!important] py-[2px] font-medium text-white ease-out hover:scale-[1.01] hover:bg-neutral-50 hover:shadow-sm">
            Demo Log In
          </button>

          {user.error && (
            <div className="mt-2">
              <span className="font-semibold text-red-500">{user.error}</span>
            </div>
          )}
        </form>

        <div className="my-5 flex w-full items-center gap-x-5">
          <div className="h-[1px] w-[45%] border-b"></div>
          <p className="text-sm font-semibold text-gray-400">OR</p>
          <div className="h-[1px] w-[45%] border-b"></div>
        </div>

        <div className="text-center">
          <div className="flex cursor-pointer items-center gap-x-1 text-[14px] text-[#4267B2]">
            <Facebook />
            <p className="font-semibold">Sign up with Facebook</p>
          </div>

          <p className="mt-2 cursor-pointer text-sm text-[#4267B2] hover:underline">
            Forgot password?
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center p-6 xs:border xs:bg-white">
        <p className="text-sm">
          Already have an account?{' '}
          <Link href="/login">
            <a>
              <span className="cursor-pointer font-semibold text-[#0095f6] hover:underline">
                Sign In
              </span>
            </a>
          </Link>
        </p>
      </div>

      <div className="mt-2 flex w-full flex-col items-center gap-y-3">
        <p className="text-sm">Get the app.</p>

        <div className="flex h-10 justify-center gap-x-4">
          <div className="relative w-[40%] cursor-pointer">
            <Image src={appleBadge} className="h-auto w-1/2" alt="" />
          </div>

          <div className="relative w-[40%] cursor-pointer">
            <Image src={googleBadge} className="h-auto w-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
