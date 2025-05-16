# Grocery E-Commerce Application

This is a React-based grocery e-commerce application that allows users to browse products, manage favorites, add items to a cart with automatic offer application, and proceed to checkout. The application features a responsive UI styled with Tailwind CSS, navigation via React Router, and state management using React Context. It fetches product data from an external API and supports special offers like "Buy 6 Coca-Cola, get 1 free."

![image](https://github.com/user-attachments/assets/210db707-c63e-4510-867b-88a61edbe98e)

![image](https://github.com/user-attachments/assets/8026a863-93e8-4118-87e8-d868240f3d52)



## Features

1.  **Product Browse**: View, search, and filter grocery products fetched from an external API. Products display name, description, price, availability, and image. Includes low stock warnings and disables cart actions for out-of-stock items.
2.  **Favorites Management**: Users can mark products as favorites, persisted in `localStorage`. A header badge displays the total number of favorited items.
3.  **Cart Management**: Add, update, and remove items from the cart. Supports special offers (e.g., "Buy 6 get 1 free"). Free items are added automatically, styled differently, and are non-editable. Quantity updates are capped at available stock. Subtotal, discounts, and total are calculated dynamically.
4.  **Checkout**: Review cart items, applied offers, and order summary. Users can update quantities or remove items. The checkout button is present but unimplemented (no payment processing). Displays a message for an empty cart.
5.  **Navigation and UI**: Responsive layout with a consistent header including store name ("GROCERIES"), search bar, and icons for favorites, cart, and user profile. Mobile/desktop layouts adjust search bar and icon visibility.
6.  **Offers Logic**: Automatic application of special offers based on cart contents. Offers are displayed in checkout with descriptions and discount amounts. (Implementation details for `applyOffers` are assumed).

## Technologies Used

* React
* React Router (`react-router-dom`)
* Tailwind CSS
* React Icons (`react-icons`)
* Axios (for API calls)
* React Context (for state management)
* localStorage (for favorites persistence)

## Installation

**Prerequisites:**

* Node.js (v14 or higher)
* npm or yarn
* A modern web browser

**Steps:**

1.  Clone the repository:
    ```bash
    git clone [https://github.com/gungunjain36/qurb-groceries.git](https://github.com/gungunjain36/qurb-groceries.git)
    cd qurb-groceries
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the application:
    ```bash
    npm run dev
    ```

The app will run at `http://localhost:5173` by default.

## Usage

* **Browse Products**: Visit the homepage (`/`) to view products. Use the search bar or category buttons to filter products.
* **Manage Favorites**: Click the heart icon on a product card to add/remove it from favorites. The favorites badge in the header updates automatically.
* **Manage Cart**: Click the cart icon on a product card to add/remove it. Navigate to `/checkout` to view and edit the cart. Offers are applied automatically.
* **Checkout**: Review cart items and order summary on the checkout page. Update quantities or remove items as needed. *Note: The checkout button is currently non-functional.*

## Project Flow

* **Startup**: Fetch products from API, load favorites from `localStorage`, initialize empty cart, render ProductList page.
* **Browse**: Filter or search products, display product cards.
* **Favorites**: Toggle status, update `localStorage` and header badge.
* **Cart**: Add/remove items, apply offers automatically, update cart badge.
* **Checkout**: View cart, apply offers, update quantities/remove items, review summary, (unimplemented) proceed to payment.
* **Navigation**: Navigate via logo, icons, or back button. (Log navigation actions to console).

## Project Structure

![image](https://github.com/user-attachments/assets/e3e00830-3b33-47d7-98d2-4f0763971ea7)

## Visit the application

[https://qurb-groceries.vercel.app/](https://qurb-groceries.vercel.app/)
