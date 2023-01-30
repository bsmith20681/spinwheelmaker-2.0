import { useState, useCallback, useEffect } from "react";

import Layout from "../components/Layout";
import SpinWheel from "../components/SpinWheel";
import ItemContainer from "../components/ItemContainer";
import SubHeaderItem from "../components/SubHeaderItem";
import Winwheel from "../dependencies/winwheel";
import ContentEditable from "react-contenteditable";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import SaveIcon from "../public/images/saveicon.png";
import SettingsIcon from "../public/images/settingsIcon.png";
import FullScreenIcon from "../public/images/fullScreenIcon.png";
import ShareIcon from "../public/images/shareIcon.png";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Dialog } from "@headlessui/react";

const Create = () => {
  const handle = useFullScreenHandle();

  let [isOpen, setIsOpen] = useState({
    settings: false,
    winner: false,
  });
  let [theWheel, setTheWheel] = useState();
  let [theWinner, setTheWinner] = useState("");
  const [title, setTitle] = useState("What to eat for Lunch?");

  let [wheelSettings, setWheelSettings] = useState({
    spinDuration: 5,
    numOfSpins: 5,
    segments: [
      { id: "0", fillStyle: "#52AB84", text: "Pizza" },
      { id: "1", fillStyle: "#D96B75", text: "Burger" },
      { id: "2", fillStyle: "#47B2C2", text: "Tacos" },
      { id: "3", fillStyle: "#DA9457", text: "Fries" },
      { id: "4", fillStyle: "#DEC85E", text: "Pasta" },
      { id: "5", fillStyle: "#325D89", text: "Hot Dogs" },
      { id: "6", fillStyle: "#6A4A80", text: "Fried Chicken" },
    ],
  });

  let createTheWheel = () => {
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
      .post("http://localhost:5000/api/v1/spinwheel", { title: title, segments: wheelSettings.segments })
      .then(() => {
        toast.success("Your Wheel Has Been Saved!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {
        toast.error("Your Wheel Has Been Saved!", {
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
    <Layout>
      {/*winner pop up*/}
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
        <SubHeaderItem icon={ShareIcon} action="Share" />
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
        <SubHeaderItem onClick={saveWheel} icon={SaveIcon} action="Save" />
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
    </Layout>
  );
};

export default Create;
