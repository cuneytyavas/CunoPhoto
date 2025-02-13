import { BtnBlue, FormInput } from "../components";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import { usePhotoStore } from "../stores/usePhotoStore";
import Compressor from "compressorjs";

const CreatePhoto = () => {
  const { addPhoto, loading } = usePhotoStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    new Compressor(file, {
      quality: 0.2,
      success(result) {
        setSuccess("Image uploaded successfully.");
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
        };
      },
      error(err) {
        console.error(err.message);
        setError("Image compression failed.");
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image || !formData.title || !formData.description) {
      setError("Please fill in all fields.");
      return;
    }
    setFormData({ ...formData, image: "" });
    addPhoto(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <h1 className="text-xl font-bold text-white mb-10">
        We Glad To See You In Here 😊
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md border border-gray-200 p-16 rounded-lg shadow-lg bg-white"
      >
        <h1>
          <span className="text-blue-500 font-bold text-2xl">Add Photo 📸</span>
        </h1>
        <FormInput
          name="title"
          type="text"
          onChange={handleChange}
          placeholder="Title"
          value={formData.title}
        />
        <FormInput
          name="description"
          type="text"
          onChange={handleChange}
          placeholder="Description"
          value={formData.description}
        />
        <label className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-pointer text-blue-500 hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
          <FaCamera className="text-2xl" />
          <span>Select Image</span>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <BtnBlue>{loading ? "Loading..." : "Add Photo"}</BtnBlue>
      </form>
    </div>
  );
};

export default CreatePhoto;
