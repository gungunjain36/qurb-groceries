export function applyOffers(cartItems) {
  let updatedCart = [...cartItems];

  // Offer 1: Buy 6 cans of Coca-Cola, get 1 free
  const cocaColaItem = updatedCart.find((item) => item.id === '239JU13' && !item.isFree);
  if (cocaColaItem && cocaColaItem.qty >= 6) {
    const freeCocaCola = updatedCart.find((item) => item.id === '239JU13-free');
    if (!freeCocaCola) {
      updatedCart.push({
        ...cocaColaItem,
        id: '239JU13-free',
        qty: 1,
        price: "£0.00",
        originalPrice: cocaColaItem.price,
        isFree: true,
      });
    }
  } else {
    updatedCart = updatedCart.filter((item) => item.id !== '239JU13-free');
  }

  // Offer 2: Buy 3 croissants, get a free coffee
  const croissantItem = updatedCart.find((item) => item.id === 'CROISSANT_ID' && !item.isFree);
  if (croissantItem && croissantItem.qty >= 3) {
    const freeCoffee = updatedCart.find((item) => item.id === 'COFFEE_ID-free');
    if (!freeCoffee) {
      updatedCart.push({
        id: 'COFFEE_ID-free',
        name: "Coffee (Free)",
        qty: 1,
        price: "£0.00",
        originalPrice: "£2.50", // Assume coffee price; adjust as needed
        isFree: true,
        available: 999, // Prevent quantity warnings
      });
    }
  } else {
    updatedCart = updatedCart.filter((item) => item.id !== 'COFFEE_ID-free');
  }

  return updatedCart;
}