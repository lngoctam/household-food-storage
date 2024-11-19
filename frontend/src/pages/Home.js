import React, { useEffect } from "react";
import axios from "axios";
import url from "../data/setting";

const Home = () => {
  useEffect(() => {
    axios
      .get(`${url}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return <></>;
};

export default Home;
