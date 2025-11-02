import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICategory } from "../interfaces/category";

interface Props {
  category: ICategory;
  selected?: boolean;
  onSelect: (id: string) => void;
}

export default function CategoryBadge({ category, selected, onSelect }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.badge,
        { backgroundColor: selected ? category.color : "#eee", borderColor: category.color },
      ]}
      onPress={() => onSelect(category.id)}
    >
      <View style={styles.inner}>
        <Text style={[styles.text, { color: selected ? "#fff" : "#333" }]}>
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    minHeight: 36,
    maxHeight: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    marginRight: 8,
  },
  inner: { flexDirection: "row", alignItems: "center" },
  text: { fontWeight: "600", fontSize: 14 },
});
