import { ExpandMore } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="mx-auto flex w-full justify-center px-4 py-10 text-xs lg:text-sm">
      <div className="flex flex-col gap-y-3 text-gray-400">
        <ul className="flex flex-wrap justify-center gap-x-4">
          <li className="cursor-pointer">Meta</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Blog</li>
          <li className="cursor-pointer">Jobs</li>
          <li className="cursor-pointer">Help</li>
          <li className="cursor-pointer">API</li>
          <li className="cursor-pointer">Privacy</li>
          <li className="cursor-pointer">Terms</li>
          <li className="cursor-pointer">Top Accounts</li>
          <li className="cursor-pointer">Hashtags</li>
          <li className="cursor-pointer">Locations</li>
          <li className="cursor-pointer">Instagram Lite</li>
        </ul>

        <ul className="flex flex-wrap justify-center gap-x-4">
          <li className="cursor-pointer">Dance</li>
          <li className="cursor-pointer">Food & Drink</li>
          <li className="cursor-pointer">Home & Garden</li>
          <li className="cursor-pointer">Music</li>
          <li className="cursor-pointer">Visual Arts</li>
        </ul>

        <ul className="flex flex-wrap justify-center gap-x-4">
          <li className="flex cursor-pointer items-center">
            English <ExpandMore />
          </li>

          <li>© 2022 Instagram from Meta</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
