import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { handleToken } from "../utils/handleToken";

const PrivateRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      handleToken(token);
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, []);

  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  if (!isVerified) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
