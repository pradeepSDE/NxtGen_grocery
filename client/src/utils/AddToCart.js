


  export const handleAddToCart = (product,dispatch, setCart) => {
    const productWithQuantity = { ...product, quantity: product.quantity || 1 };
    dispatch(setCart(productWithQuantity));
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = currentCart.find((item) => item.id === product.id);
    // console.log(exist)
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };
