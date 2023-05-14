import React from "react";
import PublicNavbar from "./PublicNavbar";
import { useSelector } from "react-redux";
import PrivateNavbar from "./PrivateNavbar";

export default function Navbar() {
  const { userData } = useSelector((state) => state?.user);
  // console.log(userData);
  return (
    <div className="navbar-container">
      {!userData?.token ? <PublicNavbar /> : <PrivateNavbar />}
    </div>
  );
  // return <PublicNavbar />;
}
