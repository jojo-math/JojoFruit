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
    image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400&h=300&fit=crop",
  },
  {
    id: "f2",
    name: "Citron",
    description: "Citron acide et frais, parfait pour les jus et desserts.",
    buyPrice: 150,
    sellPrice: 250,
    categoryId: "c1",
    stock: 90,
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop",
  },
  {
    id: "f4",
    name: "Papaye",
    description: "Papaye douce et riche en vitamines A et C.",
    buyPrice: 350,
    sellPrice: 500,
    categoryId: "c2",
    stock: 80,
    image: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=400&h=300&fit=crop",
  },
  {
    id: "f6",
    name: "Myrtille",
    description: "Myrtilles fraîches riches en antioxydants.",
    buyPrice: 900,
    sellPrice: 1200,
    categoryId: "c3",
    stock: 35,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
  },
  {
    id: "f8",
    name: "Poire",
    description: "Poire sucrée à chair fondante.",
    buyPrice: 300,
    sellPrice: 450,
    categoryId: "c4",
    stock: 150,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
  },
  {
    id: "f10",
    name: "Fruit du dragon",
    description: "Fruit tropical rare à chair rose et goût doux.",
    buyPrice: 900,
    sellPrice: 1300,
    categoryId: "c5",
    stock: 30,
    image: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=400&h=300&fit=crop",
  },
  {
    id: "f12",
    name: "Raisin",
    description: "Raisins croquants, parfaits pour les jus et desserts.",
    buyPrice: 500,
    sellPrice: 750,
    categoryId: "c6",
    stock: 110,
    image: "https://images.unsplash.com/photo-1599819177375-d4eb5d0db0a9?w=400&h=300&fit=crop",
  },
];
