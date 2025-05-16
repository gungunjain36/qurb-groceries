import { useCartCtx } from '../context/CartContext';

const DISCOUNT_AMOUNT = 0; // can be dynamic later

function useCart() {
  const { cart, addToCart, updateQty, removeFromCart, emptyCart } = useCartCtx();
  const subtotal = cart.reduce((sum, item) => {
    const p = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return sum + (p * item.qty);
  }, 0);
  const discount = DISCOUNT_AMOUNT;
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
