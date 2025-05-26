import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginform, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignUp = async () => {
    if(!firstName || firstName.length < 4) {
      setError("First name must be at least 4 characters long");
      return;
    } else if(!lastName || lastName.length < 4) {
      setError("Last name must be at least 4 characters long");
      return;
    } else if(!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
      } else if(!password || password.length < 6) {
      setError("Please enter a valid password (minimum 6 characters)");
      return;
    }
    const res = await axios.post(
      BASE_URL + "/signup",
      {
        firstName,
        lastName,
        emailId: email,
        password,
      },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));
    return navigate("/profile");
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (err) {
      if (err.response.status === 401) {
        setError(err.response.data.message);
      } else if (err.response.status === 400) {
        setError(err.response.data);
      } else if (err.response.status === 500) {
        setError("Internal Server Error");
      }
    }
  };
  return (
    <div className="flex justify-center items-center my-auto min-h-screen">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginform ? "Login" : "SignUp"}
          </h2>
          <fieldset className="fieldset">
            {!isLoginform && (
              <>
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError(null);
                  }}
                />
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError(null);
                  }}
                />
              </>
            )}
            <legend className="fieldset-legend">Email</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  setError(null);
                }}
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
            <legend className="fieldset-legend">Password</legend>

            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setError(null);
                }}
              />
            </label>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </fieldset>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                isLoginform ? handleLogin() : handleSignUp();
              }}
            >
              {isLoginform ? "Login" : "SignUp"}
            </button>
          </div>
          <div className="flex justify-center my-2">
            {isLoginform
              ? "Don't have an account? "
              : "Already have an account? "}
            <span
              className="cursor-pointer text-blue-500 underline ml-2"
              onClick={() => {
                setIsLoginForm((value) => !value);
                setIsLoginForm(!isLoginform);
                setError(null);
              }}
            >
              {isLoginform ? "SignUp" : "Login"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
