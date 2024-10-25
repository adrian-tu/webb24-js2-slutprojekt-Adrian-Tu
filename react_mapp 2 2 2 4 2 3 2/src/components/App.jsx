import { useState, useEffect } from "react";
import { getProductidinventoryprize, sendBuy } from "../utils/productidinventoryprizerequests.js";
import ProductPage from './ProductPage';
import Cart from './Cart';
import Purchase from './Purchase';

export function App() {
  const [status, setStatus] = useState("loading");
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); 
  const [buy, setBuy] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [activeSection, setActiveSection] = useState("products"); // New state for active section

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsPar = await getProductidinventoryprize();
        setProducts(productsPar);
        setOriginalProducts(productsPar.map(p => ({ ...p }))); 
        setStatus("success");
      } catch (error) {
        console.error("Error fetching products:", error);
        setStatus("error");
      }
    }
    fetchProducts();
  }, []);

  const handleBuy = (product) => {
    if (product.inventory > 0) {
      const updatedProducts = products.map((p) =>
        p.productid === product.productid
          ? { ...p, inventory: p.inventory - 1 }
          : p
      );

      setProducts(updatedProducts); 

      const existingBuy = buy.find((item) => item.productid === product.productid);
      if (existingBuy) {
        const updatedBuys = buy.map((item) =>
          item.productid === product.productid
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setBuy(updatedBuys);
        setTotalQuantity((prevQuantity) => prevQuantity + 1);
      } else {
        setBuy([
          ...buy,
          {
            productid: product.productid,
            quantity: 1,
            price: Number(product.prize),
          },
        ]);
        setTotalQuantity((prevQuantity) => prevQuantity + 1);
      }
    }
  };

  const handlePurchase = async () => {
    const inventoryUpdates = products.map((product) => {
      const boughtItem = buy.find((item) => item.productid === product.productid);
      return {
        productid: product.productid,
        inventory: boughtItem ? product.inventory : product.inventory,
      };
    });

    for (const { productid, inventory } of inventoryUpdates) {
      await sendBuy({ productid, inventory });
    }

    setBuy([]);
    setTotalQuantity(0);
    setActiveSection("purchase");
   
  };

  const handleEmptyCart = () => {
    setBuy([]);
    setTotalQuantity(0);
    setProducts(originalProducts.map(p => ({ ...p })));
    setActiveSection("products");
  };

  return (
    <main>
      {activeSection === "products" && (
        <ProductPage
          products={products}
          handleBuy={handleBuy}
          totalQuantity={totalQuantity}
          setActiveSection={setActiveSection}
        />
      )}
     {activeSection === "cart" && (
  <Cart
    buy={buy}
    handlePurchase={handlePurchase}
    setActiveSection={setActiveSection}
    totalQuantity={totalQuantity}
    handleEmptyCart={handleEmptyCart} 
  />
)}
     {activeSection === "purchase" && (
  <Purchase totalQuantity={totalQuantity} setActiveSection={setActiveSection} />
)}
    </main>
  );
}





