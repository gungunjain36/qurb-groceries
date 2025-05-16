export function applyOffers(cart, products) {
  // Debug: Log the products to see what we're working with
  console.log("Products received in applyOffers:", products);

  // Find product IDs for Coca-Cola, Croissant, and Coffee (case-insensitive matching)
  const cocaCola = products.find((p) => 
    p.name.toLowerCase().includes("coca-cola") && p.type.toLowerCase() === "drinks"
  );
  const croissant = products.find((p) => 
    p.name.toLowerCase().includes("croissant") && p.type.toLowerCase() === "bakery"
  );
  const coffee = products.find((p) => 
    p.name.toLowerCase().includes("coffee") && p.type.toLowerCase() === "drinks"
  );

  // Debug: Log the matched products
  console.log("Matched Coca-Cola:", cocaCola);
  console.log("Matched Croissant:", croissant);
  console.log("Matched Coffee:", coffee);

  // If any product is not found, return the cart unchanged with no offers
  if (!cocaCola || !croissant || !coffee) {
    console.log("One or more products not found, skipping offers.");
    return {
      updatedCart: cart.filter((item) => !item.isFree),
      appliedOffers: [],
    };
  }

  // Remove existing free items to reapply offers
  let updatedCart = cart.filter((item) => !item.isFree);
  const appliedOffers = [];

  // Count Coca-Cola and Croissants in the cart
  const cocaColaCount = updatedCart
    .filter((item) => item.id === cocaCola.id)
    .reduce((sum, item) => sum + item.qty, 0);
  const croissantCount = updatedCart
    .filter((item) => item.id === croissant.id)
    .reduce((sum, item) => sum + item.qty, 0);

  // Debug: Log the counts
  console.log("Coca-Cola count:", cocaColaCount);
  console.log("Croissant count:", croissantCount);

  // Apply Offer 1: Buy 6 Coca-Cola, get 1 free
  const freeCocaColaCount = Math.floor(cocaColaCount / 6);
  if (freeCocaColaCount > 0) {
    const cocaColaPrice = parseFloat(cocaCola.price.replace(/[^\d.]/g, ''));
    const discount = cocaColaPrice * freeCocaColaCount;
    updatedCart.push({
      ...cocaCola,
      qty: freeCocaColaCount,
      isFree: true,
      originalPrice: cocaCola.price,
      price: "£0.00",
    });
    appliedOffers.push({
      description: `Buy 6 Coca-Cola, Get 1 Free (${freeCocaColaCount}x)`,
      discount: discount,
    });
    console.log(`Applied Coca-Cola offer: ${freeCocaColaCount} free Coca-Cola added.`);
  }

  // Apply Offer 2: Buy 3 Croissants, get a free Coffee
  const freeCoffeeCount = Math.floor(croissantCount / 3);
  if (freeCoffeeCount > 0) {
    const coffeePrice = parseFloat(coffee.price.replace(/[^\d.]/g, ''));
    const discount = coffeePrice * freeCoffeeCount;
    updatedCart.push({
      ...coffee,
      qty: freeCoffeeCount,
      isFree: true,
      originalPrice: coffee.price,
      price: "£0.00",
    });
    appliedOffers.push({
      description: `Buy 3 Croissants, Get a Free Coffee (${freeCoffeeCount}x)`,
      discount: discount,
    });
    console.log(`Applied Croissant offer: ${freeCoffeeCount} free Coffee added.`);
  }

  // Debug: Log the final updated cart and applied offers
  console.log("Updated Cart:", updatedCart);
  console.log("Applied Offers:", appliedOffers);

  return {
    updatedCart,
    appliedOffers,
  };
}