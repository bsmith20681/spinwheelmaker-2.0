import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export default function Context({ children }) {
  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/getuser`,
      withCredentials: true,
    })
      .then((data) => {
        setUserObject(data.data.data);
        //console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return <UserContext.Provider value={userObject}>{userObject ? children : false}</UserContext.Provider>;
}
