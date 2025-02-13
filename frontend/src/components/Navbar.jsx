import { Link } from "react-router-dom";
import BtnBlue from "./BtnBlue";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { usePhotoStore } from "../stores/usePhotoStore";
import Loading from "./Loading";

const Navbar = () => {
  const { authUser, logout, loading } = useAuthStore();
  const { getPhotos } = usePhotoStore();
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const avatarRef = useRef(null);

  // Avatarın dışında bir yere tıklandığında logout sekmesini kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getPhotos(searchQuery);
  };

  return (
    <div className="flex justify-between h-16 items-center px-4 py-2 shadow-md fixed top-0 left-0 z-10 w-full backdrop-blur-lg bg-white/30">
      <div className="text-2xl font-bold text-blue-500 mr-2 sm:mr-8">
        <Link to="/">
          Cuno<span className="text-gray-700">Photo</span> 📸
        </Link>
      </div>
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="flex w-full max-w-md">
          <input
            className="ring-2 ring-blue-500 px-4 py-2 text-base w-full focus:outline-none focus:ring-blue-700 
               focus:shadow-md transition-all duration-300 rounded-l-md rounded-r-none"
            type="text"
            placeholder="Search Photos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 ring-2 ring-blue-500 text-white px-6 py-2 text-base rounded-r-md rounded-l-none shadow-md transition-all duration-300 
               hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <Loading />
      ) : !authUser ? (
        <div className="ml-2">
          <Link to="/login">
            <BtnBlue>Login</BtnBlue>
          </Link>
          <Link to="/register">
            <BtnBlue>Register</BtnBlue>
          </Link>
        </div>
      ) : (
        <div
          ref={avatarRef}
          className="relative ml-2"
          onMouseEnter={() => setIsHovered(true)}
        >
          <Link to={authUser?.username}>
            <img
              className="w-10 h-10 rounded-full"
              src={authUser?.avatar}
              alt=""
            />
          </Link>
          {isHovered && (
            <button
              className="absolute top-full left-[-20px] mt-2 bg-red-500 text-white rounded-md px-3 py-1 shadow-lg transition-all duration-300"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
