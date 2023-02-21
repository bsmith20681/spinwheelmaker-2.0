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
    if (!shortID) {
      return;
    }
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/spinwheel/${shortID}`,
    })
      .then((data) => {
        setResponse(data.data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shortID]);

  return loading ? (
    <Layout>
      <div className="container">
        <h1>still loading</h1>
      </div>
    </Layout>
  ) : (
    <Layout>
      <SpinWheelContainer allIterations={response.iteration} segments={response.iteration.at(-1).segments} iteration={response.iteration.at(-1) + 1} shortID={response.shortID} title={response.iteration.at(-1).title} />
    </Layout>
  );
};

export default ViewWheel;
