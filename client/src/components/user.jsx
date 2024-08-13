import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";
import defaultImage from "../assets/default.png";

const User = () => {
  const { userEmail, logout } = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const { supabase } = useSupabase();

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

  const submitForm = async (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.image;
    const file = fileInput.files[0];
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

      console.log("Upload successful, file path:", data.path);

      // Generate public URL
      const { data: publicUrlData } = supabase.storage
        .from("profile-images")
        .getPublicUrl(data.path);

      const publicUrl = publicUrlData.publicUrl;
      console.log("Public URL generated:", publicUrl);

      setImageUrl(publicUrl);  // Set the public URL to imageUrl
    } catch (error) {
      console.error("Error uploading file:", error.message);
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
        <form onSubmit={submitForm} id="upload-form">
          <label htmlFor="image">Select an image to upload:</label>
          <input type="file" id="image" accept="image/*" required />
          <button type="submit">Upload</button>
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
