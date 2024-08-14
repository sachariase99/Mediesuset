import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // New state for first name
  const [lastName, setLastName] = useState(""); // New state for last name
  const navigate = useNavigate();
  const { supabase } = useSupabase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error signing up:", error.message);
        alert("Registration failed. Please try again.");
      } else {
        console.log("User signed up:", user);

        // Insert the new user's profile into the profiles table
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            email, // Use the user's email
            first_name: firstName, // Insert the first name
            last_name: lastName, // Insert the last name
            image_url:
              "https://i0.wp.com/www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg?fit=415%2C415&ssl=1",
          },
        ]);

        if (profileError) {
          console.error("Error creating profile:", profileError.message);
        } else {
          alert("Registration successful!");
          navigate("/login"); // Redirect to login after successful registration
        }
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-xl h-[60vh] my-8 mx-8 relative"
      style={{ background: "linear-gradient(to bottom, #CCCCC3, #242526)" }}
    >
      <div className="w-1/2 absolute left-1/2 -translate-x-1/2 top-10">
        <h2 className="text-2xl font-bold mb-12">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2"
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2"
          />
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
          <div className="flex items-center my-8">
            <button
              type="submit"
              className="hover:bg-[#eee] w-1/3 justify-start py-2 border-[#C52525] border-[1px] uppercase font-bold"
            >
              Register
            </button>
            <p className="ml-3">
              Already registed?{" "}
              <Link to="/login" className="text-blue-300 underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
