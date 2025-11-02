import FruitCard from "@/src/components/FruitCard";
import { FRUITS } from "@/src/data/fruits";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";


export default function FruitListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍇 Liste des fruits disponibles</Text>
      <FlatList
        data={FRUITS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FruitCard fruit={item} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 20 },
});
