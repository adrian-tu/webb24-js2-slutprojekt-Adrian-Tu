const baseURL = "http://localhost:3000/productidinventoryprize";

async function getProductidinventoryprize(){
    const res = await fetch(baseURL)
    const productidinventorybuyquantityprize = await res.json()

    return productidinventorybuyquantityprize
}



async function sendBuy(data){
    try {
        const res = await fetch(`http://localhost:3000/products/${data.productid}`, { 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inventory: data.inventory }), 
        });
        const result = await res.json();
        console.log("Inventory updated", result);
        return result;
    } catch (error) {
        console.error("Error updating inventory:", error);
    }
}





export { getProductidinventoryprize }
export { sendBuy }