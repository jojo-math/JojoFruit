import { IFruit } from "../interfaces/fruit";

export const FRUITS: IFruit[] = [
  {
    id: "f1",
    name: "Orange",
    description: "Orange juteuse riche en vitamine C.",
    buyPrice: 200,
    sellPrice: 300,
    categoryId: "c1",
    stock: 120,
    image: "https://picsum.photos/seed/orange/400/300"
  },
  {
    id: "f2",
    name: "Ananas",
    description: "Ananas doux et parfumé.",
    buyPrice: 500,
    sellPrice: 700,
    categoryId: "c2",
    stock: 45,
    image: "https://picsum.photos/seed/ananas/400/300"
  },
  {
    id: "f3",
    name: "Fraise",
    description: "Fraises fraiches, idéales en dessert.",
    buyPrice: 800,
    sellPrice: 1100,
    categoryId: "c3",
    stock: 20,
    image: "https://picsum.photos/seed/fraise/400/300"
  },
  {
    id: "f4",
    name: "Pomme",
    description: "Pomme croquante et sucrée.",
    buyPrice: 250,
    sellPrice: 350,
    categoryId: "c4",
    stock: 200,
    image: "https://picsum.photos/seed/pomme/400/300"
  },
];