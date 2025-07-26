const fs = require('fs').promises;
const path = require('path');
const ProductManager = require('./ProductManager');

const filePathCart = path.join(__dirname, '../data/carts.json');

class CartManager {
  async getAll() {
    try {
      const data = await fs.readFile(filePathCart, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      await fs.writeFile(filePathCart, JSON.stringify([], null, 2));
      return [];
    }
  }

  async getById(id) {
    try {
      const carts = await this.getAll();
      return carts.find(c => c.id === id);
    } catch (err) {
      throw new Error('No se pudo obtener el carrito');
    }
  }

  async createCart() {
    try {
      const carts = await this.getAll();
      const newCart = {
        id: Date.now().toString(),
        products: []
      };
      carts.push(newCart);
      await fs.writeFile(filePathCart, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (err) {
      throw new Error('No se pudo crear el carrito');
    }
  }

  async addProduct(cid, pid) {
    try {
      const carts = await this.getAll();
      const cart = carts.find(c => c.id === cid);
      if (!cart) return null;

      const existing = cart.products.find(p => p.product === pid);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await fs.writeFile(filePathCart, JSON.stringify(carts, null, 2));
      return cart;
    } catch (err) {
      throw new Error('No se pudo agregar el producto al carrito');
    }
  }
}

module.exports = CartManager;