import React, { Fragment, useState } from "react";
const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:4000/api/v1/restaurants/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseResponse = await response.json();
      if (!parseResponse.jwtToken) {
        throw new Error("Invalid password or email");
      }
      localStorage.setItem("token", parseResponse.jwtToken);
      setAuth(true);
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <Fragment>
      <h2 className="text-center my-5">Login</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </Fragment>
  );
};

export default Login;
