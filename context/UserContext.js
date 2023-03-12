import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export default function Context({ children }) {
  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`,
      withCredentials: true,
    })
      .then((data) => {
        setUserObject(data.data.data);
      })
      .catch((error) => setUserObject({ isAuth: false }));
  }, []);

  return <UserContext.Provider value={[userObject, setUserObject]}>{userObject ? children : false}</UserContext.Provider>;
}
