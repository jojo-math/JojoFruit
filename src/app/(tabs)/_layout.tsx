import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen 
        name="home/index" 
        options={{ 
          title: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="database/index" 
        options={{ 
          title: "Base de données",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="server" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="database/fruits" 
        options={{ 
          title: "Fruits DB",
          href: null, // Cache cet écran de la barre de navigation
        }} 
      />
      <Tabs.Screen 
        name="database/categories" 
        options={{ 
          title: "Catégories DB",
          href: null, // Cache cet écran de la barre de navigation
        }} 
      />
      <Tabs.Screen 
        name="favorites/index" 
        options={{ 
          title: "Favoris",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="about/index" 
        options={{ 
          title: "À propos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="student/index" 
        options={{ 
          title: "Etudiants",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="contacts/index" 
        options={{ 
          title: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
