"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CartItem {
  slug: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface StoreContextType {
  cart: CartItem[];
  cartOpen: boolean;
  searchOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, delta: number) => void;
  clearCart: () => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.slug === item.slug && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((slug: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const updateQuantity = useCallback((slug: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => i.slug === slug && i.size === size ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <StoreContext.Provider
      value={{ cart, cartOpen, searchOpen, addToCart, removeFromCart, updateQuantity, clearCart, setCartOpen, setSearchOpen, cartCount, cartTotal }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
