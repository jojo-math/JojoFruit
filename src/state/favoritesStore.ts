import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { IFruit } from "../interfaces/fruit";

interface FavoritesState {
  favorites: IFruit[];
  addFavorite: (fruit: IFruit) => void;
  removeFavorite: (id: string) => void;
  loadFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (fruit) => {
    const existing = get().favorites.find((f) => f.id === fruit.id);
    if (!existing) {
      const updated = [...get().favorites, fruit];
      set({ favorites: updated });
      AsyncStorage.setItem("favorites", JSON.stringify(updated));
    }
  },

  removeFavorite: (id) => {
    const updated = get().favorites.filter((f) => f.id !== id);
    set({ favorites: updated });
    AsyncStorage.setItem("favorites", JSON.stringify(updated));
  },

  loadFavorites: async () => {
    const stored = await AsyncStorage.getItem("favorites");
    if (stored) set({ favorites: JSON.parse(stored) });
  },
}));
