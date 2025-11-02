import { CATEGORIES } from "@/src/data/categories";
import { FRUITS } from "@/src/data/fruits";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  // ✅ Calculs des totaux
  const totals = useMemo(() => {
    const buyTotal = FRUITS.reduce((sum, f) => sum + f.buyPrice, 0);
    const sellTotal = FRUITS.reduce((sum, f) => sum + f.sellPrice, 0);
    return { buyTotal, sellTotal };
  }, []);

  console.log(CATEGORIES);

  return (
    <View style={styles.container}>
      {/* --- Logo et nom --- */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://picsum.photos/seed/jojofruit/100/100" }}
          style={styles.logo}
        />
        <Text style={styles.title}>JojoFruit 🍍</Text>
        <Text style={styles.slogan}>Le goût du frais et du naturel</Text>
      </View>

      {/* --- Bloc de totaux --- */}
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>💰 Total achat</Text>
          <Text style={styles.statValue}>{totals.buyTotal.toLocaleString()} FCFA</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>📈 Total vente</Text>
          <Text style={styles.statValue}>{totals.sellTotal.toLocaleString()} FCFA</Text>
        </View>
      </View>

      {/* --- Grille des catégories --- */}
      <Text style={styles.sectionTitle}>Catégories de fruits</Text>
      <FlatList
        data={CATEGORIES}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Link href={`/fruits?categoryId=${item.id}`} asChild>
            <TouchableOpacity
              style={[styles.categoryCard, { backgroundColor: item.color }]}
            >
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", marginTop: 40, marginBottom: 20 },
  logo: { width: 100, height: 100, borderRadius: 50 },
  title: { fontSize: 26, fontWeight: "bold", marginTop: 10 },
  slogan: { color: "#888", marginTop: 4 },
  stats: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  statBox: {
    backgroundColor: "#f1f1f1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "45%",
  },
  statLabel: { fontSize: 14, color: "#444" },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#27ae60", marginTop: 6 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 8,
  },
  categoryCard: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryName: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
