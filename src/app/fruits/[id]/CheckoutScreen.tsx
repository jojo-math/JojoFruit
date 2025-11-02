import { FRUITS } from "@/src/data/fruits";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams();
  const fruit = FRUITS.find((f) => f.id === id);
  const [qty, setQty] = useState(1);
  const total = useMemo(() => qty * (fruit?.sellPrice || 0), [qty]);

  if (!fruit) return <Text>Fruit introuvable</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>🛒 Checkout — {fruit.name}</Text>
      <Text className="text-2xl">Prix unitaire : {fruit.sellPrice} FCFA</Text>

      <View style={styles.row}>
        <Button title="–" onPress={() => setQty(Math.max(1, qty - 1))} />
        <Text style={styles.qty}>{qty}</Text>
        <Button title="+" onPress={() => setQty(qty + 1)} />
      </View>

      <Text style={styles.total}>Total : {total} FCFA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16 },
  qty: { fontSize: 18, fontWeight: "700" },
  total: { marginTop: 20, fontSize: 18, fontWeight: "900" },
});
