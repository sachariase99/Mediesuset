import { createContext, useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { supabase } = useSupabase(); // Get the supabase instance
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!supabase) return; // Check if supabase is initialized

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          setIsLoggedIn(true);
          setUserEmail(session.user.email);
          setUserId(session.user.id);
        }
      } catch (error) {
        console.error("Error checking session:", error.message);
      }
    };

    checkSession();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          setIsLoggedIn(true);
          setUserEmail(session.user.email);
          setUserId(session.user.id);
        } else {
          setIsLoggedIn(false);
          setUserEmail(null);
          setUserId(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]); // Ensure supabase is included in the dependency array

  const login = (email, id) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserId(id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
