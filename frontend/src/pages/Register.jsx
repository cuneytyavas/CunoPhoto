import { Link, useNavigate } from "react-router-dom";
import { BtnBlue, FormInput } from "../components";
import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
const Register = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-10">
        Welcome, Please Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md border border-gray-200 p-16 rounded-lg shadow-lg bg-white"
      >
        <FormInput
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
        />
        <FormInput
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
        />
        <FormInput
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
        />
        <BtnBlue>Register</BtnBlue>
      </form>
      <p className="text-gray-200 mt-6">
        Already have an account?
        <Link
          to="/login"
          className="text-green-400 hover:underline text-lg font-bold"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
