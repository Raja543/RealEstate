import React, { useState , useEffect } from "react";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth , provider} from "../../Firebase";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    if (!email.trim() || !password.trim()) {
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      login(userCredentials.user);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Wrong password");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        result.user.email;
        setUser(user);
        localStorage.setItem("email", user.email);
        toast.success("Login successful", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        navigate("/home");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email or password");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Invalid email or password");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

  return (
    <>
      <div className="flex items-center min-h-screen px-60 py-20 bg-gray-100 lg:justify-center ">
        <div className="flex flex-col overflow-hidden bg-[#fff] rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md shadow-custom">
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
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Don&apos;t have an account?</span>
              <Link to="/signup" className="underline">
                Get Started!
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
            <h3 className="my-4 text-2xl font-semibold ">Account Login</h3>
            <form action="#" className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-semibold ">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="px-4 py-2 transition duration-300 border rounded focus:border-none focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  <p className="text-sm hover:underline cursor-pointer">
                    Forgot Password?
                  </p>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="px-4 py-2 transition duration-300 border  rounded focus:border-none focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-[#FFFAE9] rounded-md shadow hover:bg-[#fff7cf] focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
              <div className="flex flex-col space-y-3">
                <span className="flex items-center justify-center space-x-2">
                  <span className="h-px bg-[#000] w-14"></span>
                  <span className="font-normal text-gray-500">
                    or login with
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

export default Login;
