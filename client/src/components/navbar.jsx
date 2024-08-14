import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import defaultImage from "../assets/default.png";
import { useSupabase } from "../supabase/supabaseClient";
import { TiHome } from "react-icons/ti";

const Navbar = () => {
  const { isLoggedIn, userEmail } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!isLoggedIn || !userEmail) {
        setImageUrl(defaultImage); // Reset image if not logged in
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("image_url")
          .eq("email", userEmail)
          .single();

        if (error) {
          console.error("Error fetching profile picture:", error.message);
          setImageUrl(defaultImage); // Use default image on error
        } else if (profile && profile.image_url) {
          // Append timestamp to URL to avoid caching issues
          const imageUrlWithTimestamp = `${profile.image_url}?${new Date().getTime()}`;
          setImageUrl(imageUrlWithTimestamp);
        } else {
          setImageUrl(defaultImage); // Use default image if no profile found
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error.message);
        setImageUrl(defaultImage); // Use default image on error
      }
    };

    fetchProfilePicture();
  }, [isLoggedIn, userEmail, supabase]);

  return (
    <nav className="bg-[#242526] w-full m-auto text-white flex items-center justify-between py-4 px-4">
      {/* Logo (left side) */}
      <ul className="flex-none">
        <li>
          <Link to="/" className="hover:text-[#dddddd]">
            Logo
          </Link>
        </li>
      </ul>

      {/* Centered item */}
      <ul className="flex-grow flex justify-center">
        <li>
          <Link to="/">
            <TiHome className="text-white text-2xl hover:text-[#dddddd]" />
          </Link>
        </li>
      </ul>

      {/* Right item (user profile) */}
      <ul className="flex-none">
        <li>
          {isLoggedIn && (
            <Link to="/user">
              <img
                className="w-8 h-8 rounded-full object-cover hover:opacity-80"
                src={imageUrl}
                alt="Profile"
              />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
