import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let timer;
    const handleAuthStateChange = async (event, session) => {
      if (session && session.user) {
        login(session.user.email);
      } else {
        logout();
      }
      // Setting loading to false only if the timer has completed
      timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Minimum 1 second loading time
    };

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );

    // Cleanup subscription on component unmount
    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timer); // Clear the timer on unmount
    };
  }, [login, logout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Show loader during form submission
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
    } finally {
      setSubmitting(false); // Hide loader after submission
    }
  };

  if (loading || submitting) {
    return (
      <div className="flex items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="block h-8 w-8 bg-blue-500 rounded-full animate-bounce delay-0"></span>
        <span className="block h-8 w-8 bg-blue-500 rounded-full animate-bounce delay-100"></span>
        <span className="block h-8 w-8 bg-blue-500 rounded-full animate-bounce delay-200"></span>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Navigate to="/user" />;
  }

  return (
    <div className="text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/5 m-4 justify-start"
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-black p-2 text-black"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black p-2 text-black"
          required
        />
        <div>
          <button className="border-2 border-black mt-2 p-2" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
