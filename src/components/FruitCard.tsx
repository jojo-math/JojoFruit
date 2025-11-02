import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IFruit } from "../interfaces/fruit";
import AccordionView from "./AccordionView";

export default function FruitCard({ fruit }: { fruit: IFruit }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: fruit.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{fruit.name}</Text>
        <Text style={styles.price}>Prix vente : {fruit.sellPrice} FCFA</Text>

        {/* AccordionView (description, prix achat, stock) */}
        <AccordionView
          description={fruit.description}
          buyPrice={fruit.buyPrice}
          stock={fruit.stock}
        />

        {/* Lien vers la page détail */}
        <Link href={`/fruits/${fruit.id}`} asChild>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Voir le détail</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },
  image: { width: "100%", height: 160, borderRadius: 12, marginBottom: 10 },
  info: { flexDirection: "column" },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { color: "#27ae60", marginVertical: 4 },
  btn: {
    backgroundColor: "#27ae60",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
