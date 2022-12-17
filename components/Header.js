import Link from "next/link";
import Image from "next/image";

import Logo from "../public/images/logo.png";

const Header = () => {
  return (
    <div>
      <div className="container my-1">
        <div className="flex items-center justify-between py-3">
          <div>
            <Link href="/">
              <Image className="hover:cursor-pointer" src={Logo} alt="logo" />
            </Link>
          </div>
          <div>
            <Link href="#">
              <a className="mx-5 rounded-md border-2 bg-white py-2 px-8 text-center  font-semibold text-gray-600 transition hover:bg-gray-300">Sign In</a>
            </Link>
            <Link href="#">
              <a className="rounded-md bg-blue-600 py-2 px-8 text-center  font-semibold text-white transition hover:bg-blue-700">Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
    </div>
  );
};

export default Header;
