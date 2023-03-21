import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/cookies";
import httpRequest from "../../utils/httpRequest";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await httpRequest.post("/auth/signin", {
        email,
        password,
      });
      setCookie("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="top">
          <h1>Sign in</h1>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <label htmlFor="">Email</label>
        <input
          name="email"
          type="text"
          placeholder="email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
};

export default Login;
