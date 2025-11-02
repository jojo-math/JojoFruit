import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            home: "home",
            favorites: "heart",
            about: "information-circle",
          };
          const iconName = icons[route.name] || "ellipse";
          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Accueil" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favoris" }} />
      <Tabs.Screen name="about" options={{ title: "À propos" }} />
    </Tabs>
  );
}
