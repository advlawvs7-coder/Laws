// src/routes/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import { AuthContext } from "../Components/contextApi/AuthContext";
import { Spinnernew } from "../Components/spiner";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinnernew />
      </Center>
    );
  }

  // if (!currentUser) {
  //   return <Navigate to="/login" replace />;
  // }
  console.log(currentUser, "currentUser");
  if (
    allowedRoles &&
    !allowedRoles.includes(
      currentUser?.user?.role ||
        currentUser?.data?.role ||
        currentUser?.data?.userData?.role
    )
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
