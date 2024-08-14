import { createClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

// Initialize Supabase client once
const supabaseUrl = 'https://xolijibfaoscceamabvd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvbGlqaWJmYW9zY2NlYW1hYnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMjk1NjAsImV4cCI6MjAzODYwNTU2MH0.1XS-HXuckL3WvyH-F4abo9omSHWcOGy00OMjnN-x800';
const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
