import CategoryBadge from "@/src/components/CategoryBadge";
import FruitCard from "@/src/components/FruitCard";
import { CATEGORIES } from "@/src/data/categories";
import { FRUITS } from "@/src/data/fruits";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function FruitListScreen() {
  const params = useLocalSearchParams();
  const initialCategory = params.categoryId as string | undefined;
  const [selectedCatId, setSelectedCatId] = useState<string | null>(initialCategory || null);

  useEffect(() => {
    if (initialCategory) setSelectedCatId(initialCategory);
  }, [initialCategory]);

  const headerColor = useMemo(() => {
    if (!selectedCatId) return "#222";
    const cat = CATEGORIES.find((c) => c.id === selectedCatId);
    return cat ? cat.color : "#222";
  }, [selectedCatId]);

  const filteredFruits = useMemo(() => {
    if (!selectedCatId) return FRUITS;
    return FRUITS.filter((f) => f.categoryId === selectedCatId);
  }, [selectedCatId]);

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Text style={styles.headerText}>🍇 Liste des fruits</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
        style={{ maxHeight: 60 }}
      >
        <TouchableOpacity
          style={[styles.allButton, { backgroundColor: !selectedCatId ? "#27ae60" : "#eee" }]}
          onPress={() => setSelectedCatId(null)}
        >
          <Text style={{ color: !selectedCatId ? "#fff" : "#333", fontWeight: "700" }}>Tout</Text>
        </TouchableOpacity>

        {CATEGORIES.map((cat) => (
          <CategoryBadge
            key={cat.id}
            category={cat}
            selected={selectedCatId === cat.id}
            onSelect={setSelectedCatId}
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredFruits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FruitCard fruit={item} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingVertical: 16, alignItems: "center" },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  allButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: "#27ae60",
    minHeight: 36,
    maxHeight: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
