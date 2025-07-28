// managers/ProductManager.js
const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

function validarProducto(producto) {
  const requiredFields = ['title', 'description', 'price', 'code', 'stock', 'category'];
  for (const field of requiredFields) {
    if (!producto[field]) return false;
  }
  if (typeof producto.price !== 'number' || typeof producto.stock !== 'number') return false;
  return true;
}

class ProductManager {
  async getAll() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getById(id) {
    try {
      const productos = await this.getAll();
      return productos.find(p => p.id === id);
    } catch (error) {
      return null;
    }
  }

  async add(producto) {
    try {
      const productos = await this.getAll();

      if (!validarProducto(producto)) throw new Error('Producto inválido');

      const codeExistente = productos.find(p => p.code === producto.code);
      if (codeExistente) throw new Error('Código de producto ya existente');

      const newProduct = {
        ...producto,
        id: (productos.length ? parseInt(productos[productos.length - 1].id) + 1 : 1).toString()
      };

      productos.push(newProduct);
      await fs.writeFile(filePath, JSON.stringify(productos, null, 2));
      return newProduct;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(id) {
    try {
      const productos = await this.getAll();
      const index = productos.findIndex(p => p.id === id);
      if (index === -1) return false;

      productos.splice(index, 1);
      await fs.writeFile(filePath, JSON.stringify(productos, null, 2));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = ProductManager;
