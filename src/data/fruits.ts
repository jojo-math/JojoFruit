import { IFruit } from "../interfaces/fruit";

export const FRUITS: IFruit[] = [
  // 🍊 Agrumes
  {
    id: "f1",
    name: "Orange",
    description: "Orange juteuse riche en vitamine C.",
    buyPrice: 200,
    sellPrice: 300,
    categoryId: "c1",
    stock: 120,
    image: "https://picsum.photos/seed/orange/400/300",
  },
  {
    id: "f2",
    name: "Citron",
    description: "Citron acide et frais, parfait pour les jus et desserts.",
    buyPrice: 150,
    sellPrice: 250,
    categoryId: "c1",
    stock: 90,
    image: "https://picsum.photos/seed/citron/400/300",
  },

  // 🥭 Tropicaux
  {
    id: "f3",
    name: "Ananas",
    description: "Ananas sucré et parfumé, cultivé localement.",
    buyPrice: 500,
    sellPrice: 700,
    categoryId: "c2",
    stock: 60,
    image: "https://picsum.photos/seed/ananas/400/300",
  },
  {
    id: "f4",
    name: "Papaye",
    description: "Papaye douce et riche en vitamines A et C.",
    buyPrice: 350,
    sellPrice: 500,
    categoryId: "c2",
    stock: 80,
    image: "https://picsum.photos/seed/papaye/400/300",
  },

  // 🍓 Baies
  {
    id: "f5",
    name: "Fraise",
    description: "Fraise rouge éclatante, idéale pour les desserts.",
    buyPrice: 800,
    sellPrice: 1100,
    categoryId: "c3",
    stock: 40,
    image: "https://picsum.photos/seed/fraise/400/300",
  },
  {
    id: "f6",
    name: "Myrtille",
    description: "Myrtilles fraîches riches en antioxydants.",
    buyPrice: 900,
    sellPrice: 1200,
    categoryId: "c3",
    stock: 35,
    image: "https://picsum.photos/seed/myrtille/400/300",
  },

  // 🍎 Pommes et poires
  {
    id: "f7",
    name: "Pomme",
    description: "Pomme croquante, parfaite pour le goûter.",
    buyPrice: 250,
    sellPrice: 350,
    categoryId: "c4",
    stock: 200,
    image: "https://picsum.photos/seed/pomme/400/300",
  },
  {
    id: "f8",
    name: "Poire",
    description: "Poire sucrée à chair fondante.",
    buyPrice: 300,
    sellPrice: 450,
    categoryId: "c4",
    stock: 150,
    image: "https://picsum.photos/seed/poire/400/300",
  },

  // 🥥 Exotiques
  {
    id: "f9",
    name: "Mangue",
    description: "Mangue juteuse et parfumée, star des fruits exotiques.",
    buyPrice: 600,
    sellPrice: 850,
    categoryId: "c5",
    stock: 70,
    image: "https://picsum.photos/seed/mangue/400/300",
  },
  {
    id: "f10",
    name: "Fruit du dragon",
    description: "Fruit tropical rare à chair rose et goût doux.",
    buyPrice: 900,
    sellPrice: 1300,
    categoryId: "c5",
    stock: 30,
    image: "https://picsum.photos/seed/dragonfruit/400/300",
  },

  // 🍇 À pépins
  {
    id: "f11",
    name: "Pastèque",
    description: "Pastèque rafraîchissante riche en eau et en fibres.",
    buyPrice: 700,
    sellPrice: 950,
    categoryId: "c6",
    stock: 50,
    image: "https://picsum.photos/seed/pasteque/400/300",
  },
  {
    id: "f12",
    name: "Raisin",
    description: "Raisins croquants, parfaits pour les jus et desserts.",
    buyPrice: 500,
    sellPrice: 750,
    categoryId: "c6",
    stock: 110,
    image: "https://picsum.photos/seed/raisin/400/300",
  },
];
