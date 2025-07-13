const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

const defaultProducts = [
  {
    id: "1",
    title: "Conjunto Encaje Rojo",
    description: "Conjunto de encaje color rojo pasión.",
    code: "CJR001",
    price: 45.99,
    status: true,
    stock: 15,
    category: "Conjunto",
    thumbnails: [
      "https://example.com/images/encaje-rojo-1.jpg",
      "https://example.com/images/encaje-rojo-2.jpg"
    ]
  },
  {
    id: "2",
    title: "Bóxer de Algodón Negro",
    description: "Bóxer cómodo de algodón para hombre.",
    code: "BAN002",
    price: 19.99,
    status: true,
    stock: 30,
    category: "Bóxer",
    thumbnails: [
      "https://example.com/images/boxer-negro.jpg"
    ]
  },
  {
    id: "3",
    title: "Baby Doll Transparente",
    description: "Baby doll con transparencias y detalles delicados.",
    code: "BDT003",
    price: 39.50,
    status: true,
    stock: 20,
    category: "Baby Doll",
    thumbnails: [
      "https://example.com/images/babydoll.jpg"
    ]
  },
  {
    id: "4",
    title: "Panty Alta Tiro",
    description: "Panty de encaje con diseño alto en la cintura.",
    code: "PAT004",
    price: 14.99,
    status: true,
    stock: 40,
    category: "Panty",
    thumbnails: [
      "https://example.com/images/panty-alta.jpg"
    ]
  },
  {
    id: "5",
    title: "Bralette Blanco",
    description: "Bralette blanco sin varilla, ultra cómodo.",
    code: "BBW005",
    price: 24.99,
    status: true,
    stock: 25,
    category: "Bralette",
    thumbnails: [
      "https://example.com/images/bralette.jpg"
    ]
  }
];

class ProductManager {
  async getAll() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const products = JSON.parse(data);

      if (!Array.isArray(products) || products.length === 0) {
        await fs.writeFile(filePath, JSON.stringify(defaultProducts, null, 2));
        return defaultProducts;
      }

      return products;
    } catch (err) {
      await fs.writeFile(filePath, JSON.stringify(defaultProducts, null, 2));
      return defaultProducts;
    }
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find(p => p.id === id);
  }

  async add(product) {
    const products = await this.getAll();
    const newProduct = {
      id: (Date.now()).toString(),
      ...product,
    };
    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async update(id, updates) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates, id };
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return products[index];
  }

  async delete(id) {
    const products = await this.getAll();
    const filtered = products.filter(p => p.id !== id);
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
  }
}

module.exports = ProductManager;
