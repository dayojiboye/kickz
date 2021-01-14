export const existingItem = (prevCartItems, nextCartItem) => {
  return prevCartItems.some((item) => {
    return item.documentID === nextCartItem.documentID;
  });
};

export const handleAddToCart = (prevCartItems, nextCartItem) => {
  const itemExists = existingItem(prevCartItems, nextCartItem);

  if (itemExists) {
    return prevCartItems.map((item) => {
      return item.documentID === nextCartItem.documentID
        ? {
            ...item,
            quantity: item.quantity + nextCartItem.quantity,
          }
        : item;
    });
  }

  return [
    ...prevCartItems,
    {
      ...nextCartItem,
    },
  ];
};

export const totalCartItems = (cart) => {
  if (!cart?.length) return;

  return cart.reduce((prev, cur) => prev + cur.quantity, 0);
};

export const handleRemoveCartItem = (prevCartItems, currentID) => {
  return prevCartItems.filter((item) => item.documentID !== currentID);
};

export const handleReduceCartItem = (prevCartItems, currentItem) => {
  return prevCartItems.map((item) => {
    return item.documentID === currentItem.documentID
      ? {
          ...item,
          quantity: item.quantity - 1,
        }
      : item;
  });
};

export const totalCartPrice = (cart) => {
  return cart.reduce((prev, cur) => prev + cur.quantity * cur.price, 0);
};
