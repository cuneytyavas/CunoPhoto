import { create } from "zustand";
import customFetch from "../custom/customFetch";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  loading: false,

  register: async ({ username, email, password }) => {
    set({ loading: true });
    try {
      const response = await customFetch.post("/auth/register", {
        username,
        email,
        password,
      });
      set({ authUser: response.data });
      toast.success("Register Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  login: async ({ email, password }, navigate) => {
    set({ loading: true });
    try {
      const response = await customFetch.post("/auth/login", {
        email,
        password,
      });
      set({ authUser: response.data });
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await customFetch.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  getCurrentUser: async () => {
    set({ loading: true });
    try {
      const response = await customFetch.get("/auth/getCurrentUser");
      set({ authUser: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  updateUser: async (data) => {
    set({ loading: true });
    const username = get().authUser.username;
    try {
      const response = await customFetch.patch(
        `/user/update/${username}`,
        data
      );
      set({ authUser: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
