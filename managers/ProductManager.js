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

function validarProducto(data){
  const {title, description, code, price, status, stock, category, thumbnails}=data;

  if(typeof title !== 'string') return 'El titulo debe ser un string';
  if(typeof description !== 'string') return 'La descripción debe ser un string';
  if(typeof code !== 'string') return 'El código debe ser un string';
  if (typeof status !== 'boolean') return 'El estado debe ser booleano';
  if (typeof stock !== 'number') return 'El stock debe ser un número';
  if (typeof category !== 'string') return 'La categoría debe ser un string';
  if (!Array.isArray(thumbnails)) return 'Las imágenes deben ser un array de strings';

  return null;
}

class ProductManager {
  async getAll() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const products = JSON.parse(data);

      if (products.length === 0) {
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
    try {
      const products = await this.getAll();
      return products.find(p => p.id === id);
    } catch (err) {
      throw new Error('Error al buscar producto');
    }
  }

  async add(product) {
    try {
      const error = validarProducto(product);
      if (error) throw new Error(error);

      const products = await this.getAll();
      const newProduct = {
        id: Date.now().toString(),
        ...product,
      };
      products.push(newProduct);
      await fs.writeFile(filePath, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (err) {
      throw new Error('No se pudo agregar el producto: ' + err.message);
    }
  }

  async update(id, updates) {
    try {
      const products = await this.getAll();
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return null;
      products[index] = { ...products[index], ...updates, id };
      await fs.writeFile(filePath, JSON.stringify(products, null, 2));
      return products[index];
    } catch (err) {
      throw new Error('No se pudo actualizar el producto');
    }
  }

  async delete(id) {
    try {
      const products = await this.getAll();
      const filtered = products.filter(p => p.id !== id);
      await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
    } catch (err) {
      throw new Error('No se pudo eliminar el producto');
    }
  }
}

module.exports = ProductManager;