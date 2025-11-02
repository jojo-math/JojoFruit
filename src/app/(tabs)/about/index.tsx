import React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/seed/jojofruitlogo/120/120" }}
        style={styles.logo}
      />
      <Text style={styles.title}>JojoFruit 🍍</Text>

      <Text style={styles.description}>
        Application mobile de commerce de fruits frais.  
        Retrouvez les meilleurs fruits tropicaux du Cameroun, à prix juste !
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Réalisé par :</Text>
        <Text style={styles.infoValue}>MELONG TSAYEM Joan Mathias</Text>
        <Text style={styles.infoLabel}>Version :</Text>
        <Text style={styles.infoValue}>v1.0.0</Text>
        <Text style={styles.infoLabel}>Contact :</Text>
        <Text
          style={[styles.infoValue, styles.link]}
          onPress={() => Linking.openURL("mailto:joan.melong@saintjeaningenieur.org")}
        >
          joan.melong@saintjeaningenieur.org
        </Text>
      </View>

      <Text style={styles.footer}>© 2025 JojoFruit. Tous droits réservés.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  logo: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 8 },
  description: {
    textAlign: "center",
    color: "#4b5563",
    marginHorizontal: 20,
    marginBottom: 20,
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: "#f3f4f6",
    width: "100%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoLabel: { fontWeight: "700", color: "#374151", marginTop: 4 },
  infoValue: { color: "#111827", marginBottom: 4 },
  link: { color: "#2563eb", textDecorationLine: "underline" },
  footer: { color: "#6b7280", fontSize: 12, marginTop: 20 },
});
