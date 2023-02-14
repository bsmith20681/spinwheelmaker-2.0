import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios, { AxiosResponse } from "axios";

import Link from "next/link";
import Image from "next/image";

import Logo from "../public/images/logo.png";

const Header = () => {
  const userData = useContext(UserContext);

  const redirectToGoogleSSO = async () => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google`, "_self", "width=500,height=600");
  };

  const logout = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

          <div className="flex">
            {userData.googleId != null ? (
              <>
                <div className="flex">
                  <p>Hello {userData.first_name}</p>
                  <Image className="rounded-full" width={60} height={60} src={userData.picture} alt="profile pic" />
                </div>
                <button onClick={logout} className="mx-5 rounded-md border-2 bg-white py-2 px-8 text-center  font-semibold text-gray-600 transition hover:bg-gray-300">
                  Log Out
                </button>
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
