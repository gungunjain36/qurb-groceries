const API_URL = 'https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s';   // 

export const getProducts = async (category) => {
  try {
    const response = await fetch(`<span class="math-inline">\{API\_URL\}?category\=</span>{category}`);   // 
    if (!response.ok) {
      throw new Error('Could not fetch products');
    }
    const data = await response.json();
    return data.products || []; // Adjust based on API response structure
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};