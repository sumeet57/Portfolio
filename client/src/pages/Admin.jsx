import React from "react";
import { UserContext } from "../Context/User.context.jsx";
import Layout from "./admin/Layout.jsx";

const Admin = () => {
  const { user, loading } = React.useContext(UserContext);

  return (
    <>
      <Layout />
    </>
  );
};

export default Admin;
