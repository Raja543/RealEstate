import React, { useState, useEffect } from "react";
import { auth, provider } from "../../Firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const Signin = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        localStorage.setItem("email", user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("email");
      })
      .catch((error) => {
        console.log(error);
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
      <div>
        {user ? (
          <>
            <h1>{user.email}</h1>
            <button onClick={handleSignOut} className="m-8">
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold text-[]py-2 px-4 border border-red-600 rounded shadow login-btn"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </>
  );
};

export default Signin;
