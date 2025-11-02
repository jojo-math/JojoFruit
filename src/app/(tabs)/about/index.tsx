import React from "react";
import { Image, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
      <Image source={{ uri: "https://picsum.photos/seed/jojofruit/120/120" }} style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 12 }} />
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>JojoFruit 🍎</Text>
      <Text style={{ marginTop: 8 }}>Auteur : Ton Nom</Text>
      <Text style={{ marginTop: 4 }}>© 2025 — Tous droits réservés</Text>
    </View>
  );
}
