import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  
  // Destructure the supabase instance from the useSupabase hook
  const { supabase } = useSupabase();

  useEffect(() => {
    const handleAuthStateChange = async (event, session) => {
      if (session && session.user) {
        login(session.user.email);
      } else {
        logout();
      }
    };

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Cleanup subscription on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [login, logout, supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error signing in:", error.message);
      } else {
        console.log("Sign in successful");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/user" />;
  }

  return (
    <div
      className="bg-white p-4 rounded-xl h-[60vh] my-8 mx-8 relative"
      style={{ background: "linear-gradient(to bottom, #CCCCC3, #242526)" }}
    >
      <div className="w-1/2 absolute left-1/2 -translate-x-1/2 top-10">
        <h2 className="text-2xl font-bold mb-12">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2"
            required
          />
          <div className="flex items-center my-8">
            <button
              type="submit"
              className="hover:bg-[#eee] w-1/3 justify-start py-2 border-[#C52525] border-[1px] uppercase font-bold"
            >
              Log in
            </button>
            <p className="ml-3">
              Not registered yet?{" "}
              <Link to="/register" className="text-blue-300 underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
