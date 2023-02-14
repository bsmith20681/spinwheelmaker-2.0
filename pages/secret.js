import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

const Secret = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getuser`,
      withCredentials: true,
    })
      .then((data) => {
        setUser(data.data.data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return loading ? (
    <Layout>
      <h1>still loading</h1>
    </Layout>
  ) : (
    <Layout>
      <div className="container">{JSON.stringify(user)}</div>
    </Layout>
  );
};

export default Secret;
