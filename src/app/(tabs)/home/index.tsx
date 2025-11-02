import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 16, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>🍊 Bienvenue chez JojoFruit !</Text>
      <Text style={{ marginTop: 8 }}>Votre commerce de fruits frais 🍍</Text>
      <Link href={"/fruits"} asChild>
        <Button title="Voir la liste des fruits" />
      </Link>
    </View>
  );
}
