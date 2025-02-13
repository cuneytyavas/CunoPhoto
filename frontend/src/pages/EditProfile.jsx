import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { FaCamera } from "react-icons/fa";
import { BtnBlue, FormInput } from "../components";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";

const EditProfile = () => {
  const { authUser, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    username: authUser?.username,
    email: authUser?.email,
    avatar: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    new Compressor(file, {
      quality: 0.1,
      success(result) {
        setSuccess("Image uploaded successfully.");
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
          setFormData({ ...formData, avatar: reader.result });
        };
      },
      error(err) {
        console.error(err.message);
        setError("Image compression failed.");
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md border border-gray-200 p-16 rounded-lg shadow-lg bg-white"
      >
        <h1>
          <span className="text-blue-500 font-bold text-2xl">Edit Profile</span>
        </h1>
        <FormInput
          name="username"
          type="text"
          onChange={handleChange}
          placeholder="Username"
          value={formData.username}
        />
        <FormInput
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          value={formData.password}
        />

        {/* Custom File Input */}
        <label className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-pointer text-blue-500 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
          <FaCamera className="text-2xl" />
          <span>Select Image</span>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <BtnBlue>Save Changes</BtnBlue>
      </form>
    </div>
  );
};

export default EditProfile;
