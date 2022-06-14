import { useState, useCallback } from "react";

import Layout from "../components/Layout";
import SpinWheel from "../components/SpinWheel";
import ItemContainer from "../components/ItemContainer";
import SubHeaderItem from "../components/SubHeaderItem";
import { faShareNodes, faExpand, faGear, faFloppyDisk, faBars } from "@fortawesome/free-solid-svg-icons";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Dialog } from "@headlessui/react";

const Create = () => {
  const handle = useFullScreenHandle();

  let [isOpen, setIsOpen] = useState(false);

  const [wheelSettings, setWheelSettings] = useState({
    spinDuration: 5,
    numOfSpins: 5,
    segments: [
      { fillStyle: "#eae56f", text: "Prize One" },
      { fillStyle: "#89f26e", text: "Prize Two" },
      { fillStyle: "#7de6ef", text: "Prize Three" },
    ],
  });

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
        <SubHeaderItem icon={faShareNodes} action="Share" />
        <SubHeaderItem icon={faExpand} action="Full Screen" onClick={handle.enter} />
        <SubHeaderItem icon={faGear} action="Settings" onClick={() => setIsOpen(true)} />
        <SubHeaderItem icon={faFloppyDisk} action="Save" />
        <SubHeaderItem icon={faBars} />
      </div>
      <div className="bg-gray-100 py-10">
        <div className="container my-5 grid grid-cols-2 gap-40">
          <FullScreen handle={handle}>
            <div className="flex h-full items-center justify-center rounded-md border-2 border-gray-300 bg-white p-5">
              <SpinWheel wheelSettings={wheelSettings} />
            </div>
          </FullScreen>
          <div className=" rounded-md border-2 border-gray-300 bg-white p-5">
            <ItemContainer
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
