import { create } from "zustand";
import customFetch from "../custom/customFetch";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,

  getUser: async (username) => {
    set({ loading: true });
    try {
      const response = await customFetch.get(`/user/${username}`);
      set({ user: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  deleteUser: async (username) => {
    set({ loading: true });
    try {
      await customFetch.delete(`/user/delete/${username}`);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
