import { Redirect } from "expo-router";

export default function Index() {
  // 🚀 Redirige automatiquement vers l’onglet d’accueil
  return <Redirect href={"/(tabs)/home"}/>;
}
