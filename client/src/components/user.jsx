import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";
import defaultImage from "../assets/default.png";

const User = () => {
  const { userEmail, logout } = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchProfileImageUrl = async () => {
      // Ensure that userEmail is not null or undefined
      if (!userEmail) {
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("image_url")
          .eq("email", userEmail)
          .single(); // Use .single() to get a single object instead of an array

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (profile && profile.image_url) {
          setImageUrl(profile.image_url); // Set the image URL if it exists
        }
      } catch (error) {
        console.error("Error fetching profile image URL:", error.message);
      }
    };

    fetchProfileImageUrl();
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
      // Upload file
      const { data, error } = await supabase.storage
        .from("profile-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      console.log("Upload successful, file path:", data.path);

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(data.path);

      const publicUrl = publicUrlData.publicUrl;
      console.log("Public URL generated:", publicUrl);

      // Update profile with the new image URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ image_url: publicUrl })
        .eq("email", userEmail);

      if (updateError) {
        throw updateError;
      }

      console.log("Profile image URL updated successfully in the database.");

      // Set the new image URL to state
      setImageUrl(publicUrl);
    } catch (error) {
      console.error("Error uploading file or updating profile:", error.message);
    }
  };

  if (isLoggedOut) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h2 className="text-xl font-bold pb-2">Logged in as:</h2>
      <div className="flex flex-col items-center">
        <p className="border-2 border-black p-2 text-xl font-bold mt-2">
          {userEmail}
        </p>
        <form id="upload-form">
          <label htmlFor="image">Select an image to upload:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange} // Automatically trigger upload on file select
          />
        </form>
        <img src={imageUrl || defaultImage} alt="Uploaded file or default" />
      </div>
      <button className="mt-2 border-2 border-black p-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default User;
