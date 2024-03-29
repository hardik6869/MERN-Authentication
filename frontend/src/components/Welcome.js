import React, { useEffect, useState } from "react";
import axios from "axios";
import { setupRefreshToken, setupUser } from "../utils/apiPaths";

axios.defaults.withCredentials = true;

const Welcome = () => {
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get(setupRefreshToken, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequest = async () => {
    const res = await axios
      .get(setupUser, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));

    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);

    return () => clearInterval(interval);
  }, []);

  return <div>{user && <h1>{user.name} </h1>}</div>;
};

export default Welcome;
