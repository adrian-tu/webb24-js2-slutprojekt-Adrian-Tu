import React from "react";
const Cart = ({
  buy,
  handlePurchase,
  setActiveSection,
  totalQuantity,
  handleEmptyCart,
}) => {
  return (
    <section id="cart">
      <nav id="navbar">
        <button onClick={() => setActiveSection("products")}>PRODUCTS</button>
        <div>
          <p>Total Quantity in Cart: {totalQuantity}</p>
          CART
        </div>
      </nav>
      <div id="cartdiv">
        <div id="cartpage">
          {buy.length > 0 ? (
            buy.map((item, index) => (
              <div key={index}>
                <h4>
                  {item.productid} - Quantity: {item.quantity} - Total: $
                  {(item.price * item.quantity).toFixed(2)}
                </h4>
              </div>
            ))
          ) : (
            <p>No items in cart</p>
          )}
          <h3>
            Total: $
            {buy
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h3>
        </div>
        <div id="purchaseemptycart">
          <button id="purchasebutton" onClick={handlePurchase}>
            PURCHASE
          </button>
          <button id="emptycartbutton" onClick={handleEmptyCart}>
            EMPTY CART
          </button>
        </div>
      </div>
    </section>
  );
};
export default Cart;
