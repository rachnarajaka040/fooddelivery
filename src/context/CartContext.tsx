"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartItem, MenuItem } from "@/lib/data";

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: MenuItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      let items: CartItem[];
      if (existing) {
        items = state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        items = [...state.items, { ...action.payload, quantity: 1 }];
      }
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const itemCount = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, itemCount };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload);
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const itemCount = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, itemCount };
    }
    case "UPDATE_QTY": {
      const items =
        action.payload.qty === 0
          ? state.items.filter((i) => i.id !== action.payload.id)
          : state.items.map((i) =>
              i.id === action.payload.id
                ? { ...i, quantity: action.payload.qty }
                : i
            );
      const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const itemCount = items.reduce((s, i) => s + i.quantity, 0);
      return { items, total, itemCount };
    }
    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 };
    default:
      return state;
  }
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  const addItem = (item: MenuItem) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQty = (id: string, qty: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ state, dispatch, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
