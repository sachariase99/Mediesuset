import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext"; // Ensure correct import
import { Link } from "react-router-dom";
import supabase from "../supabase/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);
  const { isLoggedIn, userEmail, login, logout } = context;

  const handleAuthStateChange = async (event, session) => {
    if (session && session.user) {
      login(session.user.email);
    } else {
      logout();
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error signing in:", error.message);
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex flex-col items-center justify-center h-[100vh]">
          <h2 className="text-xl font-bold pb-2">Logged in as:</h2>
          <div>
            <p className="border-2 border-black p-2 text-xl font-semibold">{userEmail}</p>
          </div>
            <button className="mt-2 border-2 border-black p-2" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-1/5 m-4 justify-start"
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-black p-2"
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-black p-2"
              required
            />
            <div>
              <button className="border-2 border-black mt-2 p-2" type="submit">Log in</button>
            </div>
            <Link to="/register">
              <button className="border-2 border-black mt-2 p-2" type="button">Register</button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
