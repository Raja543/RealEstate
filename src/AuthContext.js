import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = React.createContext(undefined);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser !== null ? storedUser : null;
  });

  const navigate = useNavigate();

  const login = async (data) => {
    sessionStorage.setItem("user", data);
    setCurrentUser(data);
    navigate("/");
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      currentUser,
      login,
      logout,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
