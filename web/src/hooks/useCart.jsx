import { useCartCtx } from '../context/CartContext';

function useCart() {
  const { cart, addToCart, updateQty, removeFromCart, emptyCart } = useCartCtx();

  const subtotal = cart.reduce((sum, item) => {
    if (item.isFree) return sum;
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + price * item.qty;
  }, 0);

  const discount = cart.reduce((sum, item) => {
    if (!item.isFree) return sum;
    const originalPrice = parseFloat(
      item.originalPrice?.replace(/[^\d.]/g, '') || '0'
    );
    return sum + originalPrice * item.qty;
  }, 0);

  const total = subtotal - discount;

  return {
    cart,
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