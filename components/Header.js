import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import Image from "next/image";

import { Popover, Transition } from "@headlessui/react";

import axios from "axios";

import SignOut from "../public/images/SignOut.png";
import UserCircle from "../public/images/UserCircle.png";
import Logo from "../public/images/logo.png";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Header = () => {
  const userData = useContext(UserContext);
  const [openPopover, setOpenPopover] = useState(false);

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

          <div className="flex items-center">
            {userData.googleId != null ? (
              <>
                <p className="mr-3">Hello {userData.first_name}!</p>

                <Popover className="relative">
                  {({ open }) => (
                    /* Use the `open` state to conditionally change the direction of the chevron icon. */
                    <>
                      <Popover.Button
                        className="flex items-center"
                        onClick={() => {
                          console.log(openPopover);
                          setOpenPopover(true);
                        }}
                      >
                        {" "}
                        <Image className="rounded-lg" width={46} height={46} src={userData.picture} alt="profile pic" />
                        <ChevronDownIcon className={open ? "w-6 rotate-180 transform" : "w-6"} />
                      </Popover.Button>

                      <Popover.Panel className="absolute right-0 z-10 w-40 rounded-lg bg-white py-3 px-6 shadow-lg">
                        <div className="mb-3 flex items-center px-1  hover:cursor-pointer hover:bg-gray-100">
                          <Image src={UserCircle} alt="user account" />
                          <a className="ml-3" href="/account">
                            Account
                          </a>
                        </div>
                        <div className="flex items-center px-1  hover:cursor-pointer hover:bg-gray-100" onClick={logout}>
                          <Image src={SignOut} alt="log out" />
                          <p className="ml-3" href="/automations">
                            Logout
                          </p>
                        </div>
                      </Popover.Panel>
                    </>
                  )}
                </Popover>
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
