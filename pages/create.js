import { useState } from "react";

import Layout from "../components/Layout";
import SpinWheel from "../components/SpinWheel";
import ItemContainer from "../components/ItemContainer";

const Create = () => {
  const [segments, setSegments] = useState([
    { fillStyle: "#eae56f", text: "Prize One" },
    { fillStyle: "#89f26e", text: "Prize Two" },
    { fillStyle: "#7de6ef", text: "Prize Three" },
    { fillStyle: "#e7706f", text: "Prize Four" },
  ]);

  return (
    <Layout>
      <div className="container my-5 flex justify-around">
        <div>
          <SpinWheel segments={segments} />
          {console.log(segments)}
        </div>
        <div>
          <ItemContainer segments={segments} updateSegments={(value) => setSegments((segments) => [...segments, value])} />
        </div>
      </div>
    </Layout>
  );
};

export default Create;
