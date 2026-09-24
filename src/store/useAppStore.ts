import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  
  // Agregaremos más estado a medida que lo necesitemos (por ejemplo, el usuario)
  userProfile: Record<string, unknown> | null;
  setUserProfile: (profile: Record<string, unknown> | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
}));
