import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/supabaseClient";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate hook
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const { user, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          console.error("Error signing up:", error.message);
          alert("Registration failed. Please try again.");
        } else {
          console.log("User signed up:", user);
          alert("Registration successful!");
          navigate("/login"); // Redirect to "/" after successful registration
        }
      } catch (error) {
        console.error("Error signing up:", error.message);
        alert("Registration failed. Please try again.");
      }
    };
  
    return (
      <div className="bg-white p-4 rounded-xl h-[50vh] mb-8 mx-8 relative">
        <div className="w-1/2 absolute left-1/2 -translate-x-1/2 top-10">
          <h2 className="text-2xl font-bold mb-12">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2"
            />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full"
            />
            <button
              type="submit"
              className="hover:bg-[#eee] w-1/3 justify-start py-2 mt-6 border-[#C52525] border-[1px] uppercase font-bold"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default RegisterPage;