import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import AuthCom from "../AuthCom";
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const getName = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/restaurants/auth/dashboard",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parseResponse = await response.json();
      setName(parseResponse.user_name);
    } catch (e) {
      console.error(e);
    }
  };
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("You have successfully logout");
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <h3>Welcome Back: {name}</h3>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Log out
      </button>

      <AuthCom />
    </Fragment>
  );
};

export default Dashboard;
