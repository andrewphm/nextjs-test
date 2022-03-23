import {
  Close,
  KeyboardBackspace,
  CheckCircleOutline,
  ErrorOutline,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import imageUpload from '../../helpers/imageUpload';
import API from '../../apiCalls';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const NewPost = ({ setShowNewPost }) => {
  const [fileURL, setFileUrl] = useState(null);
  const [postCaption, setPostCaption] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const [postID, setPostID] = useState(null);
  const router = useRouter();

  const handleUserInputChange = (event) => {
    setFile((prev) => event.target.files[0]);
    setFileUrl((prev) => URL.createObjectURL(event.target.files[0]));
  };

  const handleCloseNewPost = (event) => {
    if (event.target.id === 'overlay') setShowNewPost((prev) => false);
  };

  const handlePrevious = () => {
    setFileUrl((prev) => null);
  };

  const handlePostClick = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);

    // Upload image to firebase
    const imgUrl = await imageUpload(file);
    if (!imgUrl) {
      setIsLoading((prev) => !prev);
      setError((prev) => !prev);
    }

    try {
      let { data } = await API.createNewUserPost({
        username: user.username,
        image: imgUrl,
        caption: postCaption,
      });

      setPostID((prev) => data._id);
      setIsLoading((prev) => !prev);
      setSuccess((prev) => !prev);
    } catch (error) {
      console.log(error);
      setIsLoading((prev) => !prev);
      setError((prev) => !prev);
    }
  };

  useEffect(() => {
    if (success) {
      router.push(`/p/${postID}`);
    }

    if (error) {
      setTimeout(() => {
        setShowNewPost((prev) => !prev);
      }, 2000);
    }
  }, [success, error, setShowNewPost]);

  return (
    <section
      id="overlay"
      className="fixed bottom-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80"
      onClick={handleCloseNewPost}
    >
      <div className="relative flex min-h-[60vh] w-[88%] max-w-xl flex-col items-center rounded-xl bg-white">
        <div className="w-full border-b  py-3 text-center">
          <h3 className="text-lg font-medium">
            {fileURL ? 'Write a caption' : 'Create a new post'}
          </h3>
        </div>

        <div className="flex h-full w-full flex-grow items-center">
          {!fileURL && (
            <div className="mb-10 flex h-full w-full flex-col items-center gap-y-6">
              <div className="flex flex-col items-center justify-center">
                <svg
                  aria-label="Icon to represent media such as images or videos"
                  color="#262626"
                  fill="#262626"
                  height="112"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="134"
                >
                  <path
                    d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                    fill="currentColor"
                  ></path>
                </svg>

                <h3 className="w-10/12 pt-2 text-center text-xl font-light">
                  Upload photos to share with the world
                </h3>
              </div>

              <label
                htmlFor="user-image"
                className="text-md cursor-pointer rounded-lg bg-blue-btn py-2 px-3 font-semibold text-white shadow-md transition hover:scale-[1.03] "
              >
                Select from device
                <input
                  type="file"
                  name="user-image"
                  id="user-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUserInputChange}
                />
              </label>
            </div>
          )}

          {fileURL && (
            <div className="my-3 flex h-full w-full flex-col items-center px-3">
              <div className="h-full w-full border">
                <div className="flex max-h-[400px] justify-center bg-white md:max-h-[500px]">
                  <img
                    src={fileURL}
                    alt="User uploaded photo"
                    className="object-contain"
                  />
                </div>

                <div className="w-full border-t p-3">
                  <textarea
                    name="post-caption"
                    id="post-caption"
                    value={postCaption}
                    rows="3"
                    placeholder="Write a caption..."
                    autoFocus={true}
                    className="w-full resize-none focus:outline-none"
                    onChange={(e) => setPostCaption((prev) => e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="mt-2 flex gap-x-3">
                <button
                  onClick={handlePostClick}
                  className="rounded-md bg-blue-btn px-3 py-1 text-white hover:scale-105"
                >
                  Post
                </button>
                <button
                  onClick={() => setShowNewPost((prev) => !prev)}
                  className="rounded-md bg-red-500 px-3 py-1 text-white hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Loading state Component */}
          {isLoading && (
            <div className="absolute flex h-[90%] w-full items-center justify-center bg-black bg-opacity-30">
              <div className="mb-10 flex items-center gap-x-2 rounded-lg bg-[linear-gradient(90deg,_#6F019C_0%,_#C6017E_135.12%)_!important] px-8 py-5 text-white">
                <svg
                  className="h-10 w-10 animate-spin text-white"
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
                <p className="text-lg font-semibold">Uploading... </p>
              </div>
            </div>
          )}

          {/* Error state component */}
          {error && (
            <div className="absolute flex h-[90%] w-full items-center justify-center bg-black bg-opacity-30">
              <div className="mb-10 flex items-center gap-x-2 rounded-lg bg-[linear-gradient(90deg,_#6F019C_0%,_#C6017E_135.12%)_!important] px-8 py-5 text-white">
                <ErrorOutline />
                <p className="text-lg font-semibold">Error!</p>

                <p className="block">Please try again later.</p>
              </div>
            </div>
          )}

          {/* Success state component */}
          {success && (
            <div className="absolute flex h-[90%] w-full items-center justify-center bg-black bg-opacity-30">
              <div className="mb-10 flex animate-pulse items-center gap-x-2 rounded-lg bg-[linear-gradient(90deg,_#6F019C_0%,_#C6017E_135.12%)_!important] px-8 py-5 text-white">
                <CheckCircleOutline />
                <p className="text-lg font-semibold">Success!</p>
              </div>
            </div>
          )}
        </div>

        <div
          className="absolute right-3 top-3 cursor-pointer text-gray-500"
          onClick={() => setShowNewPost((prev) => false)}
        >
          <Close />
        </div>

        {fileURL && (
          <div
            className="absolute left-5 top-3 cursor-pointer text-black"
            onClick={handlePrevious}
          >
            <KeyboardBackspace />
          </div>
        )}
      </div>
    </section>
  );
};

export default NewPost;
