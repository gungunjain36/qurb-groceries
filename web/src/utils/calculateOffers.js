export function applyOffers(cartItems) {
  let updatedCart = [...cartItems];

  // Example offer: Buy 6 mangos, get 1 free
  const mangoItem = updatedCart.find((item) => item.id === '239JU13' && !item.isFree);
  if (mangoItem && mangoItem.quantity >= 6) {
    const freeMango = updatedCart.find((item) => item.id === '239JU13' && item.isFree);
    if (!freeMango) {
      updatedCart.push({
        ...mangoItem,
        id: '239JU13-free',
        quantity: 1,
        price: 0,
        originalPrice: mangoItem.price,
        isFree: true,
      });
    }
  } else {
    updatedCart = updatedCart.filter((item) => item.id !== '239JU13-free');
  }

  return updatedCart;
}