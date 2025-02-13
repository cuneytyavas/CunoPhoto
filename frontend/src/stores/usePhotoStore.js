import { create } from "zustand";
import customFetch from "../custom/customFetch";
import toast from "react-hot-toast";

export const usePhotoStore = create((set, get) => ({
  photos: [],
  singlePhoto: {},
  loading: false,
  getPhotos: async (search) => {
    set({ loading: true });
    try {
      const url = search ? `/photo?search=${search}` : "/photo";
      const { data } = await customFetch.get(url);
      set({ photos: data });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  addPhoto: async ({ title, description, image }) => {
    set({ loading: true });
    try {
      const { data } = await customFetch.post("/photo/create", {
        title,
        description,
        image,
      });
      set((state) => ({ photos: [...state.photos, data] }));
      toast.success("Photo uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  deletePhoto: async (id) => {
    set({ loading: true });
    try {
      await customFetch.delete(`/photo/delete/${id}`);
      set((state) => ({
        photos: state.photos.filter((photo) => photo._id !== id),
      }));
      toast.success("Photo deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      set({ loading: false });
    }
  },
  getSinglePhoto: async (id) => {
    set({ loading: true });
    try {
      const { data } = await customFetch.get(`/photo/${id}`);
      set({ singlePhoto: data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      set({ loading: false });
    }
  },
  getPhotosByUser: async (username) => {
    set({ loading: true });
    try {
      const { data } = await customFetch.get(`/photo/user/${username}`);
      set({ photos: data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      set({ loading: false });
    }
  },
  resetPhotos: () => set({ photos: [] }),
}));
