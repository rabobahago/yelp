import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
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
      if (parseResponse.jwtToken) {
        localStorage.setItem("token", parseResponse.jwtToken);
        setAuth(true);
        toast.success("You have successfully login");
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }
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

      <div className=" p-4 mb-4 bg-light">
        <p>
          If you don't have Account:{" "}
          <button
            className="btn btn-success"
            onClick={() => {
              history.push("/register");
              toast.success("successfully route to sign up");
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
