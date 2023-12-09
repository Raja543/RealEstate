import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    let hasError = false;
    const updatedErrors = {};

    if (name.trim() === "") {
      updatedErrors.name = "Name is required";
      hasError = true;
    }

    if (email.trim() === "") {
      updatedErrors.email = "Email is required";
      hasError = true;
    }

    if (password.trim() === "") {
      updatedErrors.password = "Password is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(updatedErrors);
    } else {
      setErrors({});

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Signup successful", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          navigate("/login");
        })
        .catch(() => {
          toast.error("Failed to sign up");
        });
    }
  };

  const handleClick = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("email", user.email);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center min-h-screen px-4 py-4 lg:px-60 lg:py-20 bg-gray-100 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-[#fff] rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md  shadow-custom">
          <div className="p-4 py-6 text-[#000] bg-[#FFFAE9] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <Link to="/">
                <div className="flex items-center">
                  <img
                    className="w-44 cursor-pointer"
                    src="/images/Logo.svg"
                    alt="Logo"
                  />
                </div>
              </Link>
            </div>
            <p className="mt-6 text-lg font-normal text-center text-[#000] md:mt-0">
              Building a next-generation collaborative platform to connect
              renters, homeowners, and agents.
            </p>
            <p className="flex flex-col items-center justify-center mt-4 lg:mt-10 text-center">
              <span>Already have an account?</span>
              <Link to="/login" className="underline">
                Log in
              </Link>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our
              <Link to="#" className="underline px-1">
                Terms
              </Link>
              and
              <Link to="#" className="underline px-1">
                Conditions
              </Link>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold">Create an Account</h3>
            <form action="#" className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label htmlFor="name" className="text-sm font-semibold">
                  Name
                </label>
                <input
                  type="name"
                  id="name"
                  value={name}
                  placeholder="Enter your name "
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-4 focus:ring-blue-200"
                  required
                />
                {errors.name && (
                  <span className="text-orange">{errors.name}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-4 focus:ring-blue-200"
                  required
                />
                {errors.email && (
                  <span className="text-orange">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordType}
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-4 focus:ring-blue-200"
                    required
                  />
                  {errors.password && (
                    <span className="text-orange">{errors.password}</span>
                  )}
                  <div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleClick}
                  >
                    {passwordType === "password" ? (
                      <Eye className="text-[#718096] hover:text-[#2d3748] mx-2" />
                    ) : (
                      <EyeOff className="text-[#718096] hover:text-[#2d3748] mx-2" />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSignup}
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-[#FFFAE9] rounded-md shadow hover:bg-[#fff7cf] focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Sign up
                </button>
              </div>
              <div className="flex flex-col space-y-3">
                <span className="flex items-center justify-center space-x-2">
                  <span className="h-px bg-[#000] w-14"></span>
                  <span className="font-normal text-gray-500">
                    or Signup with
                  </span>
                  <span className="h-px bg-[#000] w-14"></span>
                </span>
                <div className="flex flex-row m-auto">
                  <button
                    onClick={handleSignIn}
                    className="loginBtn loginBtn--google m-1"
                  >
                    Google
                  </button>
                  <button
                    onClick={handleSignIn}
                    className="loginBtn loginBtn--facebook m-1"
                  >
                    Facebook
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
