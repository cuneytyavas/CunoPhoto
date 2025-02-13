import { Link, useNavigate } from "react-router-dom";
import { BtnBlue, FormInput } from "../components";
import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password }, navigate);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-10">
        Welcome Again, Please Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md border border-gray-200 p-16 rounded-lg shadow-lg bg-white "
      >
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <BtnBlue>Login</BtnBlue>
      </form>
      <p className="text-gray-200 mt-6">
        Don’t have an account?
        <Link
          to="/register"
          className="text-green-400 hover:underline text-lg font-bold"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
