import { create } from "zustand";

interface RunState {
  runName: string;
  setRunName: (name: string) => void;
}

const useRunStore = create<RunState>((set) => ({
  runName: "",
  setRunName: (name) => set({ runName: name }),
}));

export default useRunStore;
