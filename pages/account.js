import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { UserContext } from "../context/UserContext";
import axios from "axios";

import EditIcon from "../public/images/PencilLine.png";
import SpinWheelThumbnail from "../public/images/spinwheel-thumbnail.png";

import Layout from "../components/Layout";

const Account = () => {
  const router = useRouter();
  const userData = useContext(UserContext);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/spinwheel/allusercreated`,
      withCredentials: true,
    })
      .then((data) => {
        setResponse(data.data.data);
        setLoading(false);
        console.log(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return loading ? (
    <Layout>
      <div className="container">
        <h1>loading</h1>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className="container my-6 rounded-md bg-blue-100 p-10">
        <div className="grid grid-cols-6 gap-4">
          {response.map((item, index) => {
            return (
              <Link key={index} href={`${item.shortID}/${item.iteration.length}`} passHref>
                <div className="rounded-md p-2 transition hover:cursor-pointer hover:bg-blue-300">
                  <div className="flex justify-center rounded-md bg-white p-4">
                    <Image src={SpinWheelThumbnail} alt="thumbnail" width={125} height={125} />
                  </div>
                  <div className="my-3 flex items-center">
                    <Image src={EditIcon} alt="edit icon" width={20} height={20} />
                    {console.log("testing")}
                    {console.log(item.iteration.at(-1) != null ? item.iteration.at(-1).title : "")}
                    <p className="ml-3">{item.iteration.at(-1) != null ? item.iteration.at(-1).title : ""}</p>
                  </div>
                  <div className="my-3">
                    <p>Created on: {new Date(item.createdAt).toDateString()}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Account;
