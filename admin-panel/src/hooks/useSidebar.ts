import { create } from "zustand";

interface SidebarStore {
  showModal: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  showModal: false,
  onOpen: () => set({ showModal: true }),
  onClose: () => set({ showModal: false }),
}));
