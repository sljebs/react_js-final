"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "my-store-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.resolve()
      .then(() => {
        const storedItems = window.localStorage.getItem(STORAGE_KEY);
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          if (!Array.isArray(parsedItems)) {
            throw new Error("Saved cart data is not an array");
          }
          if (!cancelled) setItems(parsedItems);
        }
      })
      .catch((error) => {
        console.error("Unable to load saved cart:", error);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [items, ready]);

  function addToCart(product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
            : item,
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function setQuantity(productId, quantity) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, 10)) }
          : item,
      ),
    );
  }

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      setQuantity,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
