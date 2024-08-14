import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";
import defaultImage from "../assets/default.png";
import { CiLogout } from "react-icons/ci";
import Posts from "./posts";

const User = () => {
  const { userEmail, logout } = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { supabase } = useSupabase();
  const fileInputRef = useRef(null); // Reference to the file input element

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userEmail) return;

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, image_url")
          .eq("email", userEmail)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (profile) {
          setFirstName(profile.first_name || "");
          setLastName(profile.last_name || "");
          setImageUrl(profile.image_url || defaultImage);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, [supabase, userEmail]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      console.log("User signed out");
      logout();
      setIsLoggedOut(true);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;

    try {
      const { data, error } = await supabase.storage
        .from("profile-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(data.path);

      const publicUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ image_url: publicUrl })
        .eq("email", userEmail);

      if (updateError) {
        throw updateError;
      }

      // Refresh the page to reflect the updated image
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file or updating profile:", error.message);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (isLoggedOut) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-[1200px] m-auto">
      <div
      className="py-4 px-4 my-8 rounded-lg text-white max-w-[1200px] m-auto"
      style={{ background: "linear-gradient(to bottom, #CCCCC3, #242526)" }}
    >
      <div className="flex relative">
        <div className="">
          <img
            className="h-32 w-32 cursor-pointer rounded-full border-2 border-black"
            src={imageUrl || defaultImage}
            alt="Profile"
            onClick={triggerFileInput} // Trigger file input on image click
          />
          <input
            type="file"
            ref={fileInputRef} // Reference to file input
            accept="image/*"
            onChange={handleFileChange} // Automatically trigger upload on file select
            className="hidden"
          />
        </div>
        <div className="flex flex-col h-full">
          <p className="pl-4 text-3xl font-bold mt-2">
            {firstName} {lastName} {/* Display user's full name */}
          </p>
        </div>
        <button className="absolute right-0" onClick={handleLogout}>
          <CiLogout className="text-2xl text-black hover:text-[#00000098]"/>
        </button>
      </div>
    </div>
    <Posts />
    </div>
  );
};

export default User;
