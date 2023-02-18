import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

import Layout from "../../components/Layout";

const Account = () => {
  const userData = useContext(UserContext);
  const router = useRouter();
  const { userid } = router.query;

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${userid}`,
    })
      .then((data) => {
        setResponse(data.data.data);
        setLoading(false);
        console.log(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userid]);

  return loading ? (
    <Layout>
      <div className="container">
        <h1>{JSON.stringify(userid)}</h1>
        <div></div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <h1>this is the user page</h1>
    </Layout>
  );
};

export default Account;
