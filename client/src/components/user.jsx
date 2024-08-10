import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";

const User = () => {
  const { userEmail, logout } = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      console.log("User signed out");
      logout();
      setIsLoggedOut(true); // Trigger redirect after logout
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (isLoggedOut) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h2 className="text-xl font-bold pb-2">Logged in as:</h2>
      <div>
        <p className="border-2 border-black p-2 text-xl font-bold">{userEmail}</p>
      </div>
      <button className="mt-2 border-2 border-black p-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default User;
