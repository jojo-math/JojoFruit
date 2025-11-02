import AccordionView from "@/src/components/AccordionView";
import { FRUITS } from "@/src/data/fruits";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";


export default function FruitDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const fruit = FRUITS.find((f) => f.id === id);

  if (!fruit) return <Text>Fruit introuvable</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: fruit.image }} style={styles.image} />
      <Text style={styles.title}>{fruit.name}</Text>
      <Text style={styles.price}>Prix : {fruit.sellPrice} FCFA</Text>

      <AccordionView
        description={fruit.description}
        buyPrice={fruit.buyPrice}
        stock={fruit.stock}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Acheter" onPress={() => router.push(`/fruits/${fruit.id}/CheckoutScreen`)} />
        <View style={{ height: 10 }} />
        <Button title="Retour" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  image: { width: "100%", height: 200, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  price: { color: "#27ae60", fontSize: 16, fontWeight: "600" },
});
