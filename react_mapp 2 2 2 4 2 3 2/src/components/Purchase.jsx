import React from 'react';

const Purchase = ({ totalQuantity, setActiveSection }) => {
  return (
    <section id="purchasepage">
      <nav id="navbar">
        <button onClick={() => setActiveSection("products")}>
          PRODUCTS
        </button>
        <button onClick={() => setActiveSection("cart")}>
          CART
        </button>
        <div>
          <p>Total Quantity in Cart: {totalQuantity}</p>
        </div>
      </nav>
      <div id="purchasediv">
        <h2>Thank you for your purchase!</h2>
      </div>
    </section>
  );
};

export default Purchase;