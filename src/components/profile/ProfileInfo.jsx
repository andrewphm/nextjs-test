import Image from 'next/image';
import { useSelector } from 'react-redux';

import nopfp from '../../../public/images/nopfp.jpeg';

const ProfileInfo = ({ userData, userPosts }) => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="mx-auto flex w-full flex-col md:max-w-4xl">
      <div className="flex w-full items-center gap-x-5 p-4 sm:py-5 sm:px-8 md:items-start lg1:py-8">
        <div className="relative max-h-[86px] min-h-[86px] min-w-[86px] max-w-[86px] md:mx-8 md:min-h-[150px] md:min-w-[150px] xl:mx-14">
          <Image
            src={userData.image || nopfp}
            layout="fill"
            className="rounded-full border"
            objectFit="contain"
            alt=""
          />
        </div>

        <div className="hidden w-full flex-col gap-y-4 overflow-hidden pl-4 md:flex xl:gap-y-6">
          <div className="mt-2 flex gap-x-4">
            <p className="truncate text-3xl font-light">{userData.username}</p>

            <button className="rounded-md bg-blue-btn py-1 px-3 text-sm font-medium text-white">
              Follow
            </button>
          </div>

          <div className="flex gap-x-4 lg:gap-x-8">
            <p>
              <span className="font-semibold">{userPosts.length}</span> posts
            </p>
            <p>
              <span className="font-semibold">{userData.followers.length}</span>{' '}
              followers
            </p>
            <p>
              <span className="font-semibold">{userData.following.length}</span>{' '}
              following
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-semibold">{userData.fullName}</p>
            <p className="max-w-[475px]">
              This is placeholder, add feature to change later!
            </p>
          </div>
        </div>

        <div className=" flex w-full flex-col gap-y-1 overflow-hidden md:hidden">
          <p className=" w-full truncate text-2xl">{userData.username}</p>

          <button className="w-full max-w-[225px] rounded-md bg-blue-btn py-1 px-2 text-sm font-medium text-white">
            Follow
          </button>
        </div>
      </div>

      <div className="flex flex-col px-4 pb-4 sm:px-8 sm:pb-5 md:hidden">
        <h2 className="font-medium">{userData.fullName}</h2>
        <p className="max-w-[400px] text-sm">
          This is placeholder, add feature to change later!
        </p>
      </div>

      <div className="w-full border-y border-y-neutral-300 md:hidden">
        <div className="mx-auto flex w-full max-w-[450px] justify-between px-8 py-2">
          <div className="text-center">
            <p className="text-sm font-medium">{userPosts.length}</p>
            <p className="text-sm text-neutral-500">posts</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{userData.followers.length}</p>
            <p className="text-sm text-neutral-500">followers</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{userData.following.length}</p>
            <p className="text-sm text-neutral-500">following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
