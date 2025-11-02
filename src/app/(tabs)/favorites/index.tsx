import FruitCard from "@/src/components/FruitCard";
import { useFavoritesStore } from "@/src/state/favoritesStore";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";


export default function FavoritesScreen() {
  const { favorites, loadFavorites } = useFavoritesStore();

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>💖 Mes Favoris</Text>

      {favorites.length === 0 ? (
        <Text>Aucun fruit ajouté pour l’instant.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FruitCard fruit={item} />}
        />
      )}
    </View>
  );
}
