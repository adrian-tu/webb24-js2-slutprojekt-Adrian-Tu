import express from "express";
import cors from "cors";
import * as db from "./handleproductdb.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.patch('/products/:id', async (req, res) => {
    const productId = req.params.id; 
    const { inventory } = req.body; 
    
    try {
        const products = await db.getproductidinventoryprize(); 

        const productIndex = products.findIndex(p => p.productid === productId); 
        if (productIndex !== -1) {
            products[productIndex].inventory = inventory; 
            await db.saveBuy(products); 
            res.json({ message: "Inventory updated", product: products[productIndex] });
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        console.error("Error updating inventory:", error);
        res.status(500).send("Error updating inventory");
    }
});

app.get('/productidinventoryprize', async (req, res) => {
    const productidinventoryprize = await db.getproductidinventoryprize();
    res.json(productidinventoryprize);
});

app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
});















