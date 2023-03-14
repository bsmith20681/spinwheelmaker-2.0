import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import Script from "next/script";

import Image from "next/image";

import ContentEditable from "react-contenteditable";
import ItemContainer from "../components/ItemContainer";
import SpinWheel from "../components/SpinWheel";
import SubHeaderItem from "../components/SubHeaderItem";
import Winwheel from "../dependencies/winwheel";

import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FullScreenIcon from "../public/images/fullScreenIcon.png";
import SaveIcon from "../public/images/saveicon.png";
import SettingsIcon from "../public/images/settingsIcon.png";
import WheelIcon from "../public/images/spinwheel-icon-gray.png";
import ShareIcon from "../public/images/shareIcon.png";
import Cheering from "../public/cheering.mp3";
import Ticking from "../public/tick.mp3";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { runConfetti } from "../actions/confetti";

import { Dialog, Popover } from "@headlessui/react";

const SpinWheelContainer = (props) => {
  const router = useRouter();
  const handleWheel = useFullScreenHandle();

  let userData = useContext(UserContext);
  userData = userData[0];
  const isUserLoggedIn = Object.keys(userData).length != 0 ? true : false;

  let [isOpen, setIsOpen] = useState({
    settings: false,
    winner: false,
    savedURL: false,
  });

  let [theWheel, setTheWheel] = useState();
  let [theWinner, setTheWinner] = useState("");
  const [title, setTitle] = useState(props.title);
  const [savedURL, setSavedURL] = useState("");
  const [openPopover, setOpenPopover] = useState(false);

  let [wheelSettings, setWheelSettings] = useState({
    spinDuration: props.spinDuration,
    numOfSpins: 5,
    confettiOn: props.confettiOn,
    soundOn: props.soundOn,
    segments: props.segments,
  });

  const saveWheel = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/spinwheel`, {
        shortID: props.shortID,
        iteration: [{ title: title, segments: wheelSettings.segments }],
        user: userData._id ? userData._id : null,
        settings: { spinDuration: wheelSettings.spinDuration, soundOn: wheelSettings.soundOn, confettiOn: wheelSettings.confettiOn },
      })
      .then((data) => {
        console.log("response from server");
        console.log(data);
        toast.success("Your Wheel Has Been Saved!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setSavedURL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/${data.data.data.shortID}/${data.data.data.iteration.length}`);

        setIsOpen((prevState) => ({
          ...prevState,
          savedURL: true,
        }));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const updateWheel = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/spinwheel/${props.shortID}`, {
        shortID: props.shortID,
        iteration: { title: title, segments: wheelSettings.segments },
        user: userData._id ? userData._id : null,
        settings: { spinDuration: wheelSettings.spinDuration, soundOn: wheelSettings.soundOn, confettiOn: wheelSettings.confettiOn },
      })
      .then((data) => {
        console.log("response from server");
        console.log(data);
        toast.success("Your Wheel Has Been Saved!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setSavedURL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/${data.data.data.shortID}/${data.data.data.iteration.length}`);

        setIsOpen((prevState) => ({
          ...prevState,
          savedURL: true,
        }));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const playTick = () => {
    if (wheelSettings.soundOn) {
      const tickSound = new Audio(Ticking);
      tickSound.pause();
      tickSound.currentTime = 0;
      tickSound.play();
    } else {
      return null;
    }
  };

  const playCheering = () => {
    const cheerSound = new Audio(Cheering);
    cheerSound.play();
  };

  let createTheWheel = () => {
    if (wheelSettings.segments.length == 0) {
      setWheelSettings((prevState) => ({
        ...prevState,
        segments: [{ id: "0", fillStyle: "#D2D4D7", text: "Item One" }],
      }));
    }
    setTheWheel(
      new Winwheel({
        canvasId: "wheel",
        responsive: true,
        pointerAngle: 90,
        numSegments: wheelSettings.segments.length,
        textFontSize: 28,
        textFillStyle: "#ffffff",
        strokeStyle: "white",
        lineWidth: 0,
        responsive: true,
        segments: wheelSettings.segments,
        animation: {
          type: "spinToStop",
          duration: wheelSettings.spinDuration,
          spins: wheelSettings.numOfSpins,
          callbackFinished: (indicatedSegment) => {
            setIsOpen((prevState) => ({
              ...prevState,
              winner: true,
            }));
            setTheWinner(indicatedSegment.text);
            if (wheelSettings.confettiOn) {
              runConfetti();
            }

            if (wheelSettings.soundOn) {
              playCheering();
            }
          },
          callBackAfter: "drawTriangle()",
          callbackSound: playTick,
        },
      })
    );
  };

  useEffect(() => {
    createTheWheel();
  }, [wheelSettings]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(wheelSettings.segments);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWheelSettings((prevState) => ({
      ...prevState,
      segments: items,
    }));
  };

  const handleDeleteItem = (e) => {
    const findItemToDelete = wheelSettings.segments.findIndex((object) => {
      return object.id === e.currentTarget.id;
    });

    wheelSettings.segments.splice(findItemToDelete, 1);

    setWheelSettings((prevState) => ({
      ...prevState,
      segments: wheelSettings.segments,
    }));
  };

  return (
    <>
      {/*The winner is*/}
      {console.log("coming from spin wheel container")}
      {console.log(userData)}
      <Dialog
        open={isOpen.savedURL}
        onClose={() => {
          setIsOpen((prevState) => ({
            ...prevState,
            savedURL: false,
          }));
          router.push(savedURL);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-lg rounded-md bg-white py-6 px-4">
            <Dialog.Title>
              <p className="text-xl font-bold">Save this link for later</p>

              <div className="flex items-center rounded-md border-2 border-gray-400 bg-gray-100 p-2">
                <label htmlFor="email" className="sr-only">
                  Saved Link
                </label>
                <p>{savedURL}</p>
                <CopyToClipboard
                  text={savedURL}
                  onCopy={() =>
                    toast.success("Copied!", {
                      position: toast.POSITION.TOP_RIGHT,
                    })
                  }
                >
                  <span className="ml-4 flex hover:cursor-pointer hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>
                    Copy
                  </span>
                </CopyToClipboard>
              </div>
            </Dialog.Title>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/*saved url pop up*/}
      {/*settings pop up*/}
      <Dialog
        open={isOpen.settings}
        onClose={() =>
          setIsOpen((prevState) => ({
            ...prevState,
            settings: false,
          }))
        }
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-lg rounded-md bg-white py-6 px-4">
            <Dialog.Title>
              <p className="mb-5 text-xl font-bold">Settings</p>
            </Dialog.Title>

            <div className="my-3 flex items-center">
              <p className="mr-3">Confetti On:</p>
              <input
                value={wheelSettings.confettiOn}
                onChange={() =>
                  setWheelSettings((prevState) => ({
                    ...prevState,
                    confettiOn: !wheelSettings.confettiOn,
                  }))
                }
                type="checkbox"
                checked={wheelSettings.confettiOn}
              />
            </div>
            <div className="my-3 flex items-center">
              <p className="mr-3">Sounds On:</p>
              <input
                value={wheelSettings.soundOn}
                onChange={() =>
                  setWheelSettings((prevState) => ({
                    ...prevState,
                    soundOn: !wheelSettings.soundOn,
                  }))
                }
                type="checkbox"
                checked={wheelSettings.soundOn}
              />
            </div>
            <div className="my-3">
              <p>Spin Duration: {wheelSettings.spinDuration}s</p>
              <input
                type="range"
                value={wheelSettings.spinDuration}
                onChange={(value) =>
                  setWheelSettings((prevState) => ({
                    ...prevState,
                    spinDuration: value.target.value++,
                  }))
                }
                min="1"
                max="11"
              />
            </div>
          </Dialog.Panel>
          {console.log(wheelSettings)}
        </div>
      </Dialog>
      <div className="container my-3 flex flex-wrap justify-end">
        {router.pathname != "/create" ? (
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
                  <SubHeaderItem alt="create new wheel" icon={WheelIcon} action="Create New Wheel" />
                </Popover.Button>

                <Popover.Panel className="absolute -right-1/2 z-10 w-96 rounded-lg border-2 bg-white py-3 px-6 shadow-lg">
                  <div className="mb-3 px-1 text-sm">
                    <p>You are about to leave this page. Do you want to save your wheel first?</p>
                    <div className="my-3 flex items-center justify-between">
                      <Link href="/create">
                        <a className="whitespace-nowrap rounded bg-blue-500 py-2 px-4 text-sm font-bold text-white hover:bg-blue-700">Go to create page</a>
                      </Link>

                      <button onClick={updateWheel} className="rounded-md border-2 bg-white py-2 px-4 text-center font-semibold text-gray-600 transition hover:bg-gray-300">
                        Save Wheel
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        ) : null}
        <SubHeaderItem alt="save wheel" icon={ShareIcon} action="Share" onClick={router.pathname != "/create" ? updateWheel : saveWheel} />
        <SubHeaderItem
          alt="go full size"
          icon={FullScreenIcon}
          action="Full Screen"
          onClick={() => {
            handleWheel.enter();
          }}
        />
        <SubHeaderItem
          alt="edit settings"
          icon={SettingsIcon}
          action="Settings"
          onClick={() => {
            setIsOpen((prevState) => ({
              ...prevState,
              settings: true,
            }));
          }}
        />
        <SubHeaderItem alt="update wheel" onClick={router.pathname != "/create" ? updateWheel : saveWheel} icon={SaveIcon} action="Save" />
      </div>
      <div className="border-b border-gray-200"></div>

      <div className="container py-3">
        {/*Ezoic - top_of_page - top_of_page*/}
        <div id="ezoic-pub-ad-placeholder-114"></div>
        {/*End Ezoic - top_of_page - top_of_page */}
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 items-center gap-40 lg:grid-cols-2">
          <ContentEditable className="mx-auto w-fit p-2 text-center text-2xl font-bold transition hover:cursor-pointer hover:bg-blue-50" html={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="container my-5 grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-40">
          <div>
            <FullScreen handle={handleWheel}>
              <div>
                {/*  Using custom modal instead of headless because in order for it to appear on fullscreen mode it the jsx cannot be dynamically populated*/}

                <div className={isOpen.winner ? "fixed z-20" : "hidden"}>
                  <div className="fixed top-1/2 left-1/2 z-30 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white py-6 px-4">
                    <p className="mb-5 text-xl font-bold">The winner is...</p>
                    <p className="text-center text-2xl font-bold">🎉{theWinner}🎉</p>
                  </div>
                  <div
                    onClick={() => {
                      setIsOpen((prevState) => ({
                        ...prevState,
                        winner: false,
                      }));
                      setTheWinner("");
                      createTheWheel();
                    }}
                    className={isOpen.winner ? "fixed inset-0 z-20 bg-black/30" : "hidden"}
                  ></div>
                </div>
                <SpinWheel
                  wheelSettings={wheelSettings}
                  spinTheWheel={() => {
                    theWheel.startAnimation();
                  }}
                />
              </div>
            </FullScreen>
          </div>

          <div className="h-full max-h-[35rem] rounded-md bg-blue-50 p-5">
            <ItemContainer
              spinTheWheel={() => {
                theWheel.startAnimation();
              }}
              handleDeleteItem={handleDeleteItem}
              handleDragEnd={handleDragEnd}
              wheelSettings={wheelSettings}
              updateWheelSettings={(value) =>
                setWheelSettings((prevState) => ({
                  ...prevState,
                  segments: [...prevState.segments, value],
                }))
              }
            />
          </div>
        </div>
      </div>
      {/*Ezoic - bottom_of_page - bottom_of_page*/}
      <div id="ezoic-pub-ad-placeholder-113"> </div>
      {/* End Ezoic - bottom_of_page - bottom_of_page */}
      <ToastContainer />
      <Script strategy="afterInteractive">{`var ezoicId = 322222;`}</Script>
      <Script id="ezoic-script" strategy="afterInteractive" src="//go.ezoic.net/ezoic/ezoic.js"></Script>
    </>
  );
};

export default SpinWheelContainer;
