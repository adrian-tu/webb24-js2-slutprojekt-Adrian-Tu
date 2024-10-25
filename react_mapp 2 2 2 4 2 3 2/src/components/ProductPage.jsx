import React from 'react';

const ProductPage = ({ products, handleBuy, totalQuantity, setActiveSection }) => {
  return (
    <section id="Productpage">
      <nav id="navbar">
        <div className="productslabel">PRODUCTS</div>
        <button onClick={() => setActiveSection("cart")}>
          <span id="tocartpage">
            <p>Total Quantity in Cart: {totalQuantity}</p>
            CART
          </span>
        </button>
      </nav>
      <div id="productdiv">
        {products.map((product) => (
          <div className="flex" key={product.productid}>
            <figure>
              <img className="productimages" src={product.productimage} alt={product.productid} />
            </figure>
            <h3 className="product">{product.productid}</h3>
            <p className="product">Price: ${product.prize}</p>
            <p className="product">Inventory: {product.inventory}</p>
            {product.inventory > 0 ? (
              <button className="product" onClick={() => handleBuy(product)}>
                BUY
              </button>
            ) : (
              <button className="product" disabled>
                OUT OF STOCK
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPage;