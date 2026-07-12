// Data models for the food delivery app

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  tags: string[];
  isOpen: boolean;
  discount?: string;
  distance: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isPopular?: boolean;
  rating: number;
  calories?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderStatus {
  step: string;
  label: string;
  time: string;
  done: boolean;
  active: boolean;
}

// ─── Restaurant Data ───────────────────────────────────────────────────────────
export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Spice Garden",
    cuisine: "Indian · Biryani · Curry",
    rating: 4.8,
    reviews: 2341,
    deliveryTime: "25-35 min",
    deliveryFee: 29,
    minOrder: 199,
    image: "🍛",
    tags: ["Trending", "Popular"],
    isOpen: true,
    discount: "30% OFF",
    distance: "1.2 km",
  },
  {
    id: "r2",
    name: "Burger Barn",
    cuisine: "American · Burgers · Fries",
    rating: 4.6,
    reviews: 1892,
    deliveryTime: "20-30 min",
    deliveryFee: 19,
    minOrder: 149,
    image: "🍔",
    tags: ["Fast Food", "Best Value"],
    isOpen: true,
    discount: "20% OFF",
    distance: "0.8 km",
  },
  {
    id: "r3",
    name: "Pizza Palace",
    cuisine: "Italian · Pizza · Pasta",
    rating: 4.7,
    reviews: 3120,
    deliveryTime: "30-40 min",
    deliveryFee: 0,
    minOrder: 299,
    image: "🍕",
    tags: ["Free Delivery", "Top Rated"],
    isOpen: true,
    distance: "2.1 km",
  },
  {
    id: "r4",
    name: "Sushi Express",
    cuisine: "Japanese · Sushi · Ramen",
    rating: 4.9,
    reviews: 987,
    deliveryTime: "35-45 min",
    deliveryFee: 49,
    minOrder: 399,
    image: "🍣",
    tags: ["Premium", "New"],
    isOpen: true,
    discount: "15% OFF",
    distance: "3.5 km",
  },
  {
    id: "r5",
    name: "Taco Fiesta",
    cuisine: "Mexican · Tacos · Burritos",
    rating: 4.5,
    reviews: 756,
    deliveryTime: "20-25 min",
    deliveryFee: 15,
    minOrder: 149,
    image: "🌮",
    tags: ["Spicy", "Quick Delivery"],
    isOpen: true,
    distance: "1.8 km",
  },
  {
    id: "r6",
    name: "Wok & Roll",
    cuisine: "Chinese · Noodles · Dim Sum",
    rating: 4.4,
    reviews: 1230,
    deliveryTime: "25-35 min",
    deliveryFee: 25,
    minOrder: 199,
    image: "🥡",
    tags: ["Asian", "Family Packs"],
    isOpen: false,
    distance: "2.7 km",
  },
];

// ─── Menu Data ─────────────────────────────────────────────────────────────────
export const menuItems: MenuItem[] = [
  // Spice Garden (r1)
  {
    id: "m1", restaurantId: "r1",
    name: "Chicken Biryani", description: "Fragrant basmati rice cooked with tender chicken, saffron and whole spices",
    price: 279, image: "🍛", category: "Biryani", isVeg: false, isPopular: true, rating: 4.9, calories: 650,
  },
  {
    id: "m2", restaurantId: "r1",
    name: "Paneer Butter Masala", description: "Creamy tomato-based gravy with fresh cottage cheese cubes",
    price: 229, image: "🧀", category: "Curries", isVeg: true, isPopular: true, rating: 4.7, calories: 480,
  },
  {
    id: "m3", restaurantId: "r1",
    name: "Garlic Naan (4 pcs)", description: "Soft leavened bread with roasted garlic and butter",
    price: 89, image: "🫓", category: "Breads", isVeg: true, rating: 4.6, calories: 320,
  },
  {
    id: "m4", restaurantId: "r1",
    name: "Mutton Rogan Josh", description: "Slow-cooked Kashmiri mutton curry with aromatic spices",
    price: 349, image: "🍲", category: "Curries", isVeg: false, rating: 4.8, calories: 580,
  },
  // Burger Barn (r2)
  {
    id: "m5", restaurantId: "r2",
    name: "Classic Smash Burger", description: "Double smash patty, American cheese, pickles, special sauce, brioche bun",
    price: 199, image: "🍔", category: "Burgers", isVeg: false, isPopular: true, rating: 4.8, calories: 720,
  },
  {
    id: "m6", restaurantId: "r2",
    name: "BBQ Bacon Burger", description: "Crispy bacon, BBQ sauce, caramelized onions, cheddar cheese",
    price: 249, image: "🥓", category: "Burgers", isVeg: false, rating: 4.7, calories: 850,
  },
  {
    id: "m7", restaurantId: "r2",
    name: "Crispy Fries (L)", description: "Golden crispy fries seasoned with sea salt and herbs",
    price: 99, image: "🍟", category: "Sides", isVeg: true, isPopular: true, rating: 4.5, calories: 380,
  },
  {
    id: "m8", restaurantId: "r2",
    name: "Veggie Delight Burger", description: "Plant-based patty with fresh veggies and vegan mayo",
    price: 179, image: "🥬", category: "Burgers", isVeg: true, rating: 4.4, calories: 550,
  },
  // Pizza Palace (r3)
  {
    id: "m9", restaurantId: "r3",
    name: "Margherita Pizza (12\")", description: "Classic San Marzano tomato sauce, fresh mozzarella, basil",
    price: 329, image: "🍕", category: "Pizza", isVeg: true, isPopular: true, rating: 4.8, calories: 800,
  },
  {
    id: "m10", restaurantId: "r3",
    name: "Pepperoni Supreme (12\")", description: "Loaded with premium pepperoni, mozzarella and chili flakes",
    price: 399, image: "🍕", category: "Pizza", isVeg: false, isPopular: true, rating: 4.9, calories: 950,
  },
  {
    id: "m11", restaurantId: "r3",
    name: "Pasta Carbonara", description: "Creamy egg-based sauce with pancetta, parmesan and black pepper",
    price: 289, image: "🍝", category: "Pasta", isVeg: false, rating: 4.7, calories: 680,
  },
  // Sushi Express (r4)
  {
    id: "m12", restaurantId: "r4",
    name: "Salmon Nigiri (6 pcs)", description: "Fresh Atlantic salmon on hand-pressed seasoned sushi rice",
    price: 449, image: "🍣", category: "Nigiri", isVeg: false, isPopular: true, rating: 4.9, calories: 310,
  },
  {
    id: "m13", restaurantId: "r4",
    name: "Dragon Roll (8 pcs)", description: "Shrimp tempura topped with avocado, spicy mayo drizzle",
    price: 549, image: "🍱", category: "Rolls", isVeg: false, rating: 4.8, calories: 420,
  },
  // Taco Fiesta (r5)
  {
    id: "m14", restaurantId: "r5",
    name: "Chicken Tacos (3 pcs)", description: "Soft tortillas with grilled chicken, salsa, guacamole, cheese",
    price: 229, image: "🌮", category: "Tacos", isVeg: false, isPopular: true, rating: 4.7, calories: 510,
  },
  {
    id: "m15", restaurantId: "r5",
    name: "Loaded Burrito Bowl", description: "Rice, black beans, corn, pico de gallo, sour cream, guacamole",
    price: 299, image: "🌯", category: "Bowls", isVeg: true, rating: 4.6, calories: 620,
  },
];

export const categories = [
  { id: "all", label: "All", emoji: "🍽️" },
  { id: "biryani", label: "Biryani", emoji: "🍛" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "mexican", label: "Mexican", emoji: "🌮" },
  { id: "chinese", label: "Chinese", emoji: "🥡" },
  { id: "desserts", label: "Desserts", emoji: "🍰" },
];
