const fs = require('fs').promises;
const path = require('path');
const ProductManager = require('./ProductManager');

const filePath = path.join(__dirname, '../data/carts.json');
const productManager = new ProductManager();

class CartManager {
  async getAll() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
      return [];
    }
  }

  async getById(id) {
    const carts = await this.getAll();
    return carts.find(c => c.id === id);
  }

  async createCart() {
    const carts = await this.getAll();
    const newCart = {
      id: (Date.now()).toString(),
      products: []
    };
    carts.push(newCart);
    await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProduct(cid, pid) {
    const product = await productManager.getById(pid);
    if (!product) return { error: 'Producto no existe' };

    const carts = await this.getAll();
    const cart = carts.find(c => c.id === cid);
    if (!cart) return null;

    const existing = cart.products.find(p => p.product === pid);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;
