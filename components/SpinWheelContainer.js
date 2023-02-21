import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

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

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Dialog } from "@headlessui/react";

const SpinWheelContainer = (props) => {
  const router = useRouter();
  const handle = useFullScreenHandle();
  const userData = useContext(UserContext);

  let [isOpen, setIsOpen] = useState({
    settings: false,
    winner: false,
    savedURL: false,
  });

  let [theWheel, setTheWheel] = useState();
  let [theWinner, setTheWinner] = useState("");
  const [title, setTitle] = useState(props.title);
  const [savedURL, setSavedURL] = useState("");

  let [wheelSettings, setWheelSettings] = useState({
    spinDuration: 5,
    numOfSpins: 5,
    segments: props.segments,
  });

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
          },
          callBackAfter: "drawTriangle()",
          //callbackSound: playSound,
        },
      })
    );
  };

  const saveWheel = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/spinwheel`, {
        shortID: props.shortID,
        iteration: [{ title: title, segments: wheelSettings.segments }],
        user: userData._id ? userData._id : null,
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
          <Dialog.Panel className="mx-auto max-w-md rounded-md bg-white py-6 px-4">
            <Dialog.Title>
              <p className="text-2xl font-bold">Save this link for later</p>

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

      <Dialog
        open={isOpen.winner}
        onClose={() => {
          setIsOpen((prevState) => ({
            ...prevState,
            winner: false,
          }));
          setTheWinner("");
          createTheWheel();
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-md bg-white py-6 px-4">
            <Dialog.Title>
              <p className="text-2xl font-bold">The winner is...</p>
              <p>{theWinner}</p>
            </Dialog.Title>
          </Dialog.Panel>
        </div>
      </Dialog>

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
          <Dialog.Panel className="mx-auto max-w-sm rounded-md bg-white py-6 px-4">
            <Dialog.Title>
              <p className="text-2xl font-bold">Settings</p>
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
            </Dialog.Title>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div className="container my-3 flex justify-end">
        {/*<SubHeaderItem icon={ShareIcon} action="Share" />*/}
        <SubHeaderItem icon={FullScreenIcon} action="Full Screen" onClick={handle.enter} />
        <SubHeaderItem
          icon={SettingsIcon}
          action="Settings"
          onClick={() => {
            setIsOpen((prevState) => ({
              ...prevState,
              settings: true,
            }));
          }}
        />
        <SubHeaderItem onClick={Object.keys(router.query).length == 0 ? saveWheel : updateWheel} icon={SaveIcon} action="Save" />
      </div>
      <div className="border-b border-gray-200"></div>
      <div className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-40 md:grid-cols-2">
            <ContentEditable className="mx-auto w-fit p-2 text-center text-2xl font-bold transition hover:cursor-pointer hover:bg-blue-50" html={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>

        <div className="container my-5 grid grid-cols-1 items-center gap-40 md:grid-cols-2">
          <div>
            <FullScreen handle={handle}>
              <SpinWheel
                wheelSettings={wheelSettings}
                spinTheWheel={() => {
                  theWheel.startAnimation();
                }}
              />
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
      <ToastContainer />
    </>
  );
};

export default SpinWheelContainer;
