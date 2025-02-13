import { Navigate, Route, Routes } from "react-router-dom";
import {
  CreatePhoto,
  EditProfile,
  Home,
  Login,
  Profile,
  Register,
  SinglePhoto,
} from "./pages";
import { Navbar } from "./components";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";

function App() {
  const { authUser, getCurrentUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      getCurrentUser();
    };
    fetchUser();
  }, [getCurrentUser]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Profile />} />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/create-photo"
          element={authUser ? <CreatePhoto /> : <Navigate to="/register" />}
        />
        <Route path="/photos/:id" element={<SinglePhoto />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
