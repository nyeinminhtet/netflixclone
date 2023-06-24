import React from "react";
import { create } from "zustand";

export interface ModelProps {
  movieId?: string;
  isOpen: boolean;
  openModel: (movieId: string) => void;
  closeModel: () => void;
}

const useInfoModel = create<ModelProps>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModel: (movieId: string) => set({ isOpen: true, movieId }),
  closeModel: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModel;
