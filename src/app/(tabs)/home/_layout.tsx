import { CATEGORIES } from "@/src/data/categories";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Link, withLayoutContext } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = withLayoutContext(Drawer.Navigator);
const DrawerScreen = withLayoutContext(Drawer.Screen);

export default function HomeLayout() {
  return (
    <DrawerNavigator
      screenOptions={{
        headerShown: true,
        drawerType: "slide",
        drawerStyle: { backgroundColor: "#f9fafb", width: 240 },
        drawerLabelStyle: { fontWeight: "600" },
      }}
      // ⚡️ Contenu du menu personnalisé
      drawerContent={() => (
        <View style={styles.drawerContainer}>
          <Text style={styles.drawerTitle}>🍍 Catégories</Text>

          <Link href="/fruits" asChild>
            <TouchableOpacity style={styles.allBtn}>
              <Text style={styles.allText}>Tout afficher</Text>
            </TouchableOpacity>
          </Link>

          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/fruits?categoryId=${cat.id}`} asChild>
              <TouchableOpacity
                style={[styles.catBtn, { backgroundColor: cat.color }]}
              >
                <Text style={styles.catText}>{cat.name}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      )}
    >
      <DrawerScreen
        name="index"
        options={{
          title: "Accueil",
          drawerLabel: "Accueil",
        }}
      />
    </DrawerNavigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  allBtn: {
    backgroundColor: "#27ae60",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  allText: { color: "#fff", fontWeight: "700" },
  catBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  catText: { color: "#fff", fontWeight: "700" },
});
