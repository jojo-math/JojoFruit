import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="bg-slate-500 p-4 text-3xl">Edit app/index.tsx to edit this screen.</Text>
      <Link href="/_sitemap" className="bg-red-900 p-6 rounded-md">Sitemap</Link>
    </SafeAreaView>
  );
}
