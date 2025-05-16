import { useCartCtx } from '../context/CartContext';

function useCart() {
  const { cart, appliedOffers, addToCart, updateQty, removeFromCart, emptyCart } = useCartCtx();

  const subtotal = cart.reduce((sum, item) => {
    if (item.isFree) return sum;
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + price * item.qty;
  }, 0);

  const discount = appliedOffers.reduce((sum, offer) => sum + offer.discount, 0);

  const total = subtotal - discount;

  return {
    cart,
    appliedOffers,
    addToCart,
    updateQty,
    removeFromCart,
    emptyCart,
    subtotal,
    discount,
    total,
  };
}

export default useCart;