import { CATEGORIES } from "@/src/data/categories";
import { FRUITS } from "@/src/data/fruits";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  // ✅ Calculs des totaux
  const totals = useMemo(() => {
    const buyTotal = FRUITS.reduce((sum, f) => sum + f.buyPrice, 0);
    const sellTotal = FRUITS.reduce((sum, f) => sum + f.sellPrice, 0);
    return { buyTotal, sellTotal };
  }, []);

  // Debug: vérifier les catégories
  console.log("CATEGORIES:", CATEGORIES);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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

        {/* --- Carousel des catégories --- */}
        <Text style={styles.sectionTitle}>Catégories de fruits</Text>
        <View style={styles.carouselContainer}>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item }) => (
              <Link href={`/fruits?categoryId=${item.id}`} asChild>
                <TouchableOpacity
                  style={{
                    width: 160,
                    height: 128,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                    backgroundColor: item.color,
                  }}
                >
                  <Text style={styles.categoryName}>{item.name}</Text>
                </TouchableOpacity>
              </Link>
            )}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  slogan: {
    color: "#6b7280",
    marginTop: 4,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  statBox: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "45%",
  },
  statLabel: {
    fontSize: 14,
    color: "#4b5563",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 8,
  },
  carouselContainer: {
    height: 150,
  },
  carouselContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  categoryCard: {
    width: 160,
    height: 128,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  categoryName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

