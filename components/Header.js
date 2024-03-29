import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import Image from "next/image";

import { Popover, Dialog } from "@headlessui/react";

import axios from "axios";

import SignOut from "../public/images/SignOut.png";
import UserCircle from "../public/images/UserCircle.png";
import WheelIcon from "../public/images/spinwheel-icon-gray.png";

import Logo from "../public/images/logo.png";
import FacebookLogo from "../public/images/facebook-logo.png";
import GoogleLogo from "../public/images/google-icon.svg";
import TwitterLogo from "../public/images/twitter-logo-blue.svg";
import DefaultProfile from "../public/images/profile_pic.png";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Header = () => {
  const [userObject, setUserObject] = useContext(UserContext);
  const [openPopover, setOpenPopover] = useState(false);

  const [loginPopup, setLoginPopup] = useState(false);
  const [signinPopup, setSigninPopup] = useState(false);

  //used to calculate middle of screen with parent window to display SSO screen in the middle

  const fetchUser = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`,
      withCredentials: true,
    })
      .then((data) => {
        setUserObject(data.data.data);
      })
      .catch((error) => setUserObject({ isAuth: false }));
  };

  const redirectToGoogleSSO = async () => {
    const newWindow = window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google`, "_blank", `width=500,height=600,top=50%,left=50%`);

    if (newWindow) {
      const startInterval = setInterval(() => {
        if (newWindow.closed) {
          fetchUser();
          if (startInterval) clearInterval(startInterval);
        }
      }, 500);
    }
  };

  const redirectToFacebookSSO = async () => {
    const newWindow = window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/facebook`, "_blank", `width=500,height=600,top=50%,left=50%`);

    if (newWindow) {
      const startInterval = setInterval(() => {
        if (newWindow.closed) {
          fetchUser();
          if (startInterval) clearInterval(startInterval);
        }
      }, 500);
    }
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
        <div className="flex flex-wrap items-center justify-center py-3 md:justify-between">
          <div>
            <Link href="/" passHref>
              <div>
                <Image className="hover:cursor-pointer" src={Logo} alt="logo" />
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            {userObject.isAuth != false ? (
              <>
                <p className="mr-3">Hello {userObject.first_name}!</p>

                <Popover className="relative">
                  {({ open }) => (
                    /* Use the `open` state to conditionally change the direction of the chevron icon. */
                    <>
                      <Popover.Button
                        className="flex items-center"
                        onClick={() => {
                          setOpenPopover(true);
                        }}
                      >
                        {" "}
                        <Image className="rounded-lg" width={46} height={46} src={userObject.picture == null ? DefaultProfile : userObject.picture} alt="profile pic" />
                        <ChevronDownIcon className={open ? "w-6 rotate-180 transform" : "w-6"} />
                      </Popover.Button>

                      <Popover.Panel className="absolute right-0 z-10 w-64 rounded-lg bg-white py-3 px-6 shadow-lg">
                        <Link href="/account" passHref>
                          <div className="mb-3 flex items-center px-1  hover:cursor-pointer hover:bg-gray-100">
                            <Image src={UserCircle} alt="user account" />

                            <a className="ml-3">Account</a>
                          </div>
                        </Link>
                        <Link href="/create" passHref>
                          <div className="mb-3 flex items-center px-1  hover:cursor-pointer hover:bg-gray-100">
                            <div className="flex w-5 items-center">
                              <Image src={WheelIcon} alt="create new wheel" />
                            </div>

                            <a className="ml-3">Create New Wheel</a>
                          </div>
                        </Link>
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
                <button onClick={() => setLoginPopup(true)} className="mx-5 rounded-md border-2 bg-white py-2 px-8 text-center  font-semibold text-gray-600 transition hover:bg-gray-300">
                  Login
                </button>

                <button onClick={() => setSigninPopup(true)} className="whitespace-nowrap rounded-md bg-blue-600 py-2 px-8  text-center font-semibold text-white transition hover:bg-blue-700">
                  Sign Up
                </button>
                <Dialog open={loginPopup} onClose={() => setLoginPopup(false)} className="relative z-50">
                  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                  <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-full max-w-lg rounded-md bg-white py-6 px-4">
                      <Dialog.Title>
                        <p className="mb-5">Login</p>
                      </Dialog.Title>
                      <div>
                        <button onClick={redirectToGoogleSSO} className="mb-5 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                          <div className="mr-4 flex items-center">
                            <Image width={25} height={25} src={GoogleLogo} alt="google Logo" />
                          </div>
                          <p className="flex w-36 justify-start">Login with Google</p>
                        </button>
                        <button onClick={redirectToFacebookSSO} className="mb-5 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                          <div className="mr-4 flex items-center">
                            <Image width={25} height={25} src={FacebookLogo} alt="google Logo" />
                          </div>
                          <p className="flex w-36 justify-start">Login with Facebook</p>
                        </button>
                        {/*                     <button onClick={redirectToGoogleSSO} className="mb-5 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                          <div className="mr-4 flex items-center">
                            <Image width={25} height={25} src={TwitterLogo} alt="google Logo" />
                          </div>
                          <p className="flex w-36 justify-start">Login with Twitter</p>
            </button> */}
                      </div>
                    </Dialog.Panel>
                  </div>
                </Dialog>

                <Dialog open={signinPopup} onClose={() => setSigninPopup(false)} className="relative z-50">
                  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                  <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-full max-w-lg rounded-md bg-white py-6 px-4">
                      <Dialog.Title>
                        <p>Sign Up</p>
                      </Dialog.Title>
                      <div>
                        <button onClick={redirectToGoogleSSO} className="mb-5 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                          <div className="mr-4 flex items-center">
                            <Image width={25} height={25} src={GoogleLogo} alt="google Logo" />
                          </div>
                          <p className="flex w-40 justify-start">Signup with Google</p>
                        </button>
                        <button onClick={redirectToFacebookSSO} className="mb-5 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                          <div className="mr-4 flex items-center">
                            <Image width={25} height={25} src={FacebookLogo} alt="google Logo" />
                          </div>
                          <p className="flex w-40 justify-start">Signup with Facebook</p>
                        </button>
                        {/*<button onClick={redirectToGoogleSSO} className="mb-5 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                          <div className="mr-4 flex items-center">
                            <Image width={25} height={25} src={TwitterLogo} alt="google Logo" />
                          </div>
                          <p className="flex w-40 justify-start">Signup with Twitter</p>
          </button>*/}
                      </div>
                    </Dialog.Panel>
                  </div>
                </Dialog>
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
