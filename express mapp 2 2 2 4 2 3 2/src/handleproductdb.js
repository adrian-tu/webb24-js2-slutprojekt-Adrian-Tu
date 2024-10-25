import fs from "fs/promises"

async function getproductidinventoryprize(){

    try {
        const rawData= await fs.readFile('./src/productsdb.json', 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading products file:', error);
        return [];
    }
}

async function saveBuy(updatedProducts) {
  try {
      await fs.writeFile('./src/productsdb.json', JSON.stringify(updatedProducts, null, 2));
      return updatedProducts;
  } catch (error) {
      console.error('Error saving products', error);
  }
}







export { getproductidinventoryprize };
export { saveBuy };