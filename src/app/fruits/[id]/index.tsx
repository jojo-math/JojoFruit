import AccordionView from "@/src/components/AccordionView";
import { FRUITS } from "@/src/data/fruits";
import { useFavoritesStore } from "@/src/state/favoritesStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Dialog, List, Provider as PaperProvider, Portal } from "react-native-paper";
export default function FruitDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const fruit = FRUITS.find((f) => f.id === id);

  const [visible, setVisible] = useState(false);
  const { addFavorite } = useFavoritesStore();

  if (!fruit) return <Text>Fruit introuvable</Text>;

  const hideDialog = () => setVisible(false);

  return (
    <PaperProvider>
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
          <Button title="Actions ⚙️" onPress={() => setVisible(true)} />
        </View>

        {/* --- Boîte de dialogue --- */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Actions sur {fruit.name}</Dialog.Title>
            <Dialog.Content>
              <List.Item
                title="Ajouter aux Favoris"
                left={(props) => <List.Icon {...props} icon="heart" color="red" />}
                onPress={() => {
                  addFavorite(fruit);
                  hideDialog();
                }}
              />
              <List.Item
                title="Acheter"
                left={(props) => <List.Icon {...props} icon="cart" />}
                onPress={() => {
                  hideDialog();
                  router.push(`/fruits/${fruit.id}/CheckoutScreen`);
                }}
              />
              <List.Item
                title="Pas intéressé"
                left={(props) => <List.Icon {...props} icon="cancel" />}
                onPress={() => {
                  hideDialog();
                  router.back();
                }}
              />
              <List.Item
                title="Annuler"
                left={(props) => <List.Icon {...props} icon="close" />}
                onPress={hideDialog}
              />
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  image: { width: "100%", height: 200, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  price: { color: "#27ae60", fontSize: 16, fontWeight: "600" },
});
