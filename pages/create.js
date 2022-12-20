import { useState, useCallback, useEffect } from "react";

import Layout from "../components/Layout";
import SpinWheel from "../components/SpinWheel";
import ItemContainer from "../components/ItemContainer";
import SubHeaderItem from "../components/SubHeaderItem";
import Winwheel from "../dependencies/winwheel";

import SaveIcon from "../public/images/saveicon.png";
import SettingsIcon from "../public/images/settingsIcon.png";
import FullScreenIcon from "../public/images/fullScreenIcon.png";
import ShareIcon from "../public/images/shareIcon.png";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Dialog } from "@headlessui/react";

const Create = () => {
  const handle = useFullScreenHandle();

  let [isOpen, setIsOpen] = useState(false);
  let [theWheel, setTheWheel] = useState();

  let [wheelSettings, setWheelSettings] = useState({
    spinDuration: 5,
    numOfSpins: 5,
    segments: [
      { fillStyle: "#52AA83", text: "Prize One" },
      { fillStyle: "#D96B75", text: "Prize Two" },
      { fillStyle: "#48B2C3", text: "Prize Three" },
    ],
  });

  useEffect(() => {
    setTheWheel(
      new Winwheel({
        canvasId: "wheel",
        responsive: true,
        pointerAngle: 90,

        numSegments: wheelSettings.segments.length,
        textFontSize: 28,
        strokeStyle: "white",
        segments: wheelSettings.segments,
        animation: {
          type: "spinToStop",
          duration: wheelSettings.spinDuration,
          spins: wheelSettings.numOfSpins,
          callbackFinished: (indicatedSegment) => {
            console.log(indicatedSegment);
          },
          callBackAfter: "drawTriangle()",
          //callbackSound: playSound,
        },
      })
    );
  }, [wheelSettings]);

  const handleDragEnd = (result) => {
    const items = Array.from(wheelSettings.segments);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWheelSettings((prevState) => ({
      ...prevState,
      segments: items,
    }));
  };

  return (
    <Layout>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
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
        <SubHeaderItem icon={SettingsIcon} action="Settings" onClick={() => setIsOpen(true)} />
        <SubHeaderItem icon={SaveIcon} action="Save" />
      </div>
      <div class="border-b border-gray-200"></div>
      <div className="py-10">
        <div className="container my-5 grid grid-cols-1 gap-40 md:grid-cols-2">
          <FullScreen handle={handle}>
            <SpinWheel
              wheelSettings={wheelSettings}
              spinTheWheel={() => {
                theWheel.startAnimation();
              }}
            />
          </FullScreen>
          <div className="rounded-md bg-blue-50 p-5">
            <ItemContainer
              spinTheWheel={() => {
                theWheel.startAnimation();
              }}
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
    </Layout>
  );
};

export default Create;
