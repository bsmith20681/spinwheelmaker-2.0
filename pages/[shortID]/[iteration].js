import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import axios from "axios";

import SpinWheelContainer from "../../components/SpinWheelContainer";

const ViewWheel = () => {
  const router = useRouter();
  const { shortID, iteration } = router.query;
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/api/v1/spinwheel/${shortID}/${iteration}`,
    })
      .then((data) => {
        setResponse(data.data.data[0]);
        setLoading(false);
        console.log(data.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [iteration]);

  return loading ? (
    <Layout>
      <div className="container">
        <h1>still loading</h1>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className="container">
        <SpinWheelContainer segments={response.segments} iteration={response.iteration} shortID={response.shortID} title={response.title} />
      </div>
    </Layout>
  );
};

export default ViewWheel;
