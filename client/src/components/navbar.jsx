import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FaUserCircle } from "react-icons/fa"; // Import a user icon from react-icons

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="bg-[#5A2D74] w-1/3 rounded-full m-auto text-white">
      <ul className="flex gap-4 justify-center align-center py-4 px-6">
        <li className="hover:text-[#dddddd]">
          <Link to="/home">Home</Link>
        </li>
        {isLoggedIn ? (
          <li className="">
            <Link to="/user">
              <FaUserCircle size={24} />
            </Link>
          </li>
        ) : (
          <li className="hover:text-[#ffffff]">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
