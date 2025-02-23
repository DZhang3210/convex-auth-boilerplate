import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface Confirm {
  isOn: boolean;
  setIsOn: (isOn: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  message: string;
  setMessage: (message: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const useConfirm = create<Confirm>((set) => ({
  isOn: false,
  setIsOn: (isOn) => set({ isOn }),
  title: "",
  setTitle: (title) => set({ title }),
  message: "",
  setMessage: (message) => set({ message }),
  onConfirm: () => {},
  onCancel: () => {},
}));

export default useConfirm;
