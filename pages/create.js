import { useState } from "react";

import Layout from "../components/Layout";
import SpinWheel from "../components/SpinWheel";
import ItemContainer from "../components/ItemContainer";
import SubHeaderItem from "../components/SubHeaderItem";
import { faShareNodes, faExpand, faGear, faFloppyDisk, faBars } from "@fortawesome/free-solid-svg-icons";

const Create = () => {
  const [segments, setSegments] = useState([
    { fillStyle: "#eae56f", text: "Prize One" },
    { fillStyle: "#89f26e", text: "Prize Two" },
    { fillStyle: "#7de6ef", text: "Prize Three" },
  ]);

  return (
    <Layout>
      <div className="container my-3 flex justify-end">
        <SubHeaderItem icon={faShareNodes} action="Share" />
        <SubHeaderItem icon={faExpand} action="Full Screen" />
        <SubHeaderItem icon={faGear} action="Settings" />
        <SubHeaderItem icon={faFloppyDisk} action="Save" />
        <SubHeaderItem icon={faBars} />
      </div>
      <div className="bg-gray-100 py-10">
        <div className="container my-5 grid grid-cols-2 gap-40">
          <div className="flex justify-center rounded-md border-2 border-gray-300 bg-white p-5">
            <SpinWheel segments={segments} />
          </div>
          <div className=" rounded-md border-2 border-gray-300 bg-white p-5">
            <ItemContainer segments={segments} updateSegments={(value) => setSegments((segments) => [...segments, value])} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
