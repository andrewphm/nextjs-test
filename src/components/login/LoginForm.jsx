import { useState, useRef, useEffect } from 'react';
import logo from '../../../public/images/logo.png';
import googleBadge from '../../../public/images/login/googleplaybadge.png';
import appleBadge from '../../../public/images/login/applestorebadge.png';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginFailure, loginSuccess } from '../../redux/userRedux';
import API from 'src/apiCalls';

const initialForm = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const [form, setForm] = useState(initialForm);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Focus input and change title
  useEffect(() => {
    document.title = 'Login - Instagram';

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call post auth login endpoint
    try {
      // Assign user to persisted global state
      dispatch(loginStart());
      const res = await API.userLogin(form);
      dispatch(loginSuccess(res.data));
      window.location.reload();
    } catch (error) {
      // Display error message
      dispatch(loginFailure(error.response.data.error));
    }
  };

  const handleDemoLogin = async (event) => {
    event.preventDefault();

    console.log('demo');
  };

  return (
    <div className="flex w-[350px] flex-col gap-y-3">
      <div className="flex w-full flex-col items-center p-6 xs:border xs:bg-white">
        <div className="relative mb-2 h-[20px] w-40 p-10">
          <Image
            src={logo}
            layout="fill"
            objectFit="contain"
            alt="logo"
            priority={true}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-y-2"
        >
          <input type="hidden" value="prayer" />

          <div
            className={`relative w-full rounded-sm border bg-white xs:bg-[#fafafa] ${
              form.username ? 'pt-[9px] pb-[1px]' : 'py-[5px]'
            }`}
          >
            <input
              className="w-full bg-transparent px-2 text-sm font-light autofill:bg-yellow-200 focus:outline-none"
              id="username"
              name="username"
              type="text"
              ref={inputRef}
              autoFocus
              autoComplete="new-username"
              onChange={handleFormChange}
              value={form.username}
              aria-label="Enter a username."
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
              aria-label="Enter a password."
              className="w-full bg-transparent px-2 text-sm font-light autofill:bg-transparent focus:outline-none"
              id="password"
              name="password"
              autoComplete="new-password"
              type={isVisible ? 'text' : 'password'}
              onChange={handleFormChange}
              value={form.password}
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
            type="submit"
            className={`mt-3 w-full rounded-md bg-[#0095f6] py-[2px] font-medium text-white shadow-sm ease-out hover:scale-[1.01] ${
              form.username && form.password && !user.isFetching
                ? 'hover:shadow-md'
                : 'cursor-not-allowed opacity-50'
            }`}
            disabled={
              form.username && form.password && !user.isFetching ? false : true
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
              <span>Log In</span>
            )}
          </button>

          <button
            onClick={handleDemoLogin}
            className="w-full rounded-md border bg-[linear-gradient(90deg,_#6F019C_0%,_#C6017E_135.12%)_!important] py-[2px] font-medium text-white ease-out hover:scale-[1.01] hover:bg-neutral-50 hover:shadow-sm"
          >
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
            <p className="font-semibold">Log in with Facebook</p>
          </div>

          <p className="mt-2 cursor-pointer text-sm text-[#4267B2] hover:underline">
            Forgot password?
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center p-6 xs:border xs:bg-white">
        <p className="text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup">
            <a>
              <span className="cursor-pointer font-semibold text-[#0095f6] hover:underline">
                Sign Up
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
  );
};

export default LoginForm;
