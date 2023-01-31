import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import axios from "axios";

import SpinWheelContainer from "../../components/SpinWheelContainer";

const ViewWheel = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);

      axios({
        method: "GET",
        url: `http://localhost:5000/api/v1/spinwheel/${id}`,
        responseType: "application/json",
      })
        .then((data) => {
          setData(JSON.parse(data.data));
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [id]);

  return loading ? (
    <Layout>
      <div className="container">
        <h1>still loading</h1>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className="container">
        {console.log(data.data.segments)}
        <SpinWheelContainer segments={data.data.segments} title={data.data.title} />
      </div>
    </Layout>
  );
};

export default ViewWheel;
