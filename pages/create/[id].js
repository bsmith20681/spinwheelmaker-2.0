import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import axios from "axios";

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
          console.log(data.data);
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
        <h1>Your wheel will be displayed here</h1>
        {JSON.stringify(data)}
      </div>
    </Layout>
  );
};

export default ViewWheel;
