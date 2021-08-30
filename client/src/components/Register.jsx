import React, { Fragment, useState } from "react";
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({ email: "", password: "", name: "" });
  const { email, password, name } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:4000/api/v1/restaurants/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseResponse = await response.json();
      localStorage.setItem("token", parseResponse.token);
      setAuth(true);
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <Fragment>
      <h2 className="text-center my-5">Register</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </Fragment>
  );
};

export default Register;
