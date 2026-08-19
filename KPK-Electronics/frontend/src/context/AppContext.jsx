import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kpk-cart") || "[]");
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kpk-wishlist") || "[]");
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kpk-user") || "null");
    } catch {
      return null;
    }
  });

  // Save cart
  useEffect(() => {
    localStorage.setItem("kpk-cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem("kpk-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.product === product._id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.product === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "",
          quantity: 1,
        },
      ];
    });
  };

  // Change cart quantity
  const changeQty = (productId, quantity) => {
    setCart((currentCart) => {
      if (quantity <= 0) {
        return currentCart.filter(
          (item) => item.product !== productId
        );
      }

      return currentCart.map((item) =>
        item.product === productId
          ? {
              ...item,
              quantity,
            }
          : item
      );
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.product !== productId
      )
    );
  };

  // Empty the cart (e.g. after an order is placed)
  const clearCart = () => {
    setCart([]);
  };

  // Add/remove wishlist item
  const toggleWish = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item._id !== product._id
        );
      }

      return [...currentWishlist, product];
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("kpk-token");
    localStorage.removeItem("kpk-user");
    setUser(null);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      user,
      setUser,
      addToCart,
      changeQty,
      removeFromCart,
      clearCart,
      toggleWish,
      logout,
      cartCount,
      cartTotal,
    }),
    [cart, wishlist, user, cartCount, cartTotal]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}