import Link from "next/link";
import Image from "next/image";

import Logo from "../public/images/logo.png";

const Header = (props) => {
  const redirectToGoogleSSO = async () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_blank", "width=500,height=600");
  };

  return (
    <div>
      <div className="container my-1">
        <div className="flex items-center justify-between py-3">
          <div>
            <Link href="/">
              <Image className="hover:cursor-pointer" src={Logo} alt="logo" />
            </Link>
          </div>

          <div class="flex">
            {props.isAuth ? (
              <>
                <h1>you are logged in</h1>
              </>
            ) : (
              <>
                <button onClick={redirectToGoogleSSO} className="mx-5 rounded-md border-2 bg-white py-2 px-8 text-center  font-semibold text-gray-600 transition hover:bg-gray-300">
                  Sign In
                </button>

                <button onClick={redirectToGoogleSSO} className="rounded-md bg-blue-600 py-2 px-8 text-center  font-semibold text-white transition hover:bg-blue-700">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
    </div>
  );
};

export default Header;
