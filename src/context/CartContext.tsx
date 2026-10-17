"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WholesaleTier {
  minQty: number;
  unitPrice: number;
  discountPct: number;
}

export interface CartItem {
  id: string; // product id
  name: string;
  image: string;
  retailPrice: number;
  wholesaleTiers: WholesaleTier[];
  quantity: number;
  storeName: string;
  size?: string;
  isMall?: boolean;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountTotal: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("greeny_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore parse error
    }
  }, []);

  const saveItems = (updated: CartItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem("greeny_cart", JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
  };

  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    const existing = items.find((i) => i.id === product.id);
    let updated: CartItem[];
    if (existing) {
      updated = items.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      updated = [...items, { ...product, quantity }];
    }
    saveItems(updated);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    const updated = items.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i));
    saveItems(updated);
  };

  const removeFromCart = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
  };

  // Calculate pricing considering wholesale tiers
  let subtotal = 0;
  let total = 0;
  let itemCount = 0;

  items.forEach((item) => {
    itemCount += item.quantity;
    const baseItemSubtotal = item.retailPrice * item.quantity;
    subtotal += baseItemSubtotal;

    // Check wholesale tiers (descending order of minQty)
    const sortedTiers = [...(item.wholesaleTiers || [])].sort((a, b) => b.minQty - a.minQty);
    const matchedTier = sortedTiers.find((t) => item.quantity >= t.minQty);

    if (matchedTier) {
      total += matchedTier.unitPrice * item.quantity;
    } else {
      total += baseItemSubtotal;
    }
  });

  const discountTotal = Math.max(0, subtotal - total);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountTotal,
        total,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
