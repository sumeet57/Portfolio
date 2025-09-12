import React from "react";
import { UserContext } from "../Context/User.context.jsx";

const Dashboard = () => {
  const { user, loading } = React.useContext(UserContext);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard Page{" "}
          {loading
            ? "Loading..."
            : user
            ? `Welcome, ${user.name}!`
            : "No user data"}
        </h1>
      </div>
    </>
  );
};

export default Dashboard;
