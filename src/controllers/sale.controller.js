import Sale from '../models/sale.model.js';
import Product from '../models/product.model.js';
import { map } from 'zod';

// Controlador para crear una venta
export const createSaleAdmin = async (req, res) => {

  try {
    //console.log(req.body)
    const { sellerName, products } = req.body;

    // Calcular el precio total de la venta

    const totalAmount = products.reduce((total, product) => {
      return total + product.quantity * 0;
    }, 0);
    console.log(products)
    console.log(sellerName)

    console.log(totalAmount)

    const sale = new Sale({
      sellerName,
      products,
      totalAmount,
    });
    //console.log(sale)

    await sale.save();
    res.status(201).json({ message: 'Venta creada exitosamente', sale });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

export const createSaleReception = async (req, res) => {
  try {
    console.log(req.body)
    const { sellerName, products } = req.body;

    const userFound = await User.findOne({ username: sellerName });
    console.log(userFound.username);
    // Calcular el precio total de la venta

    const totalAmount = products.reduce((total, product) => {
      return total + product.quantity * product.priceReception;
    }, 0);


    const sale = new Sale({
      sellerName,
      products,
      totalAmount,
    });
    console.log(sale)

    await sale.save();
    res.status(201).json({ message: 'Venta creada exitosamente', sale });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

export const createSaleClient = async (req, res) => {
  try {
    //console.log(req.body)
    const { sellerName, products } = req.body;
    //console.log(products)
    // Calcular el precio total de la venta

    const totalAmount = products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);

    console.log(totalAmount)
    
    for (const product of products) {
      // Encuentra el producto en la base de datos por su ID y actualiza su cantidad
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id, // Suponiendo que el ID del producto está en _id
        { $inc: { quantity: -product.quantity } }, // Resta la cantidad vendida
        { new: true }
      );
      
      // Verifica si el producto se actualizó correctamente
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
    }

    const sale = new Sale({
      sellerName,
      products,
      totalAmount,
    });
    //console.log(sale)

    await sale.save();
    res.status(201).json({ message: 'Venta creada exitosamente', sale });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate();
    res.json(sales);
  } catch (error) {
    return res.status(404).json({ message: "something went wrong" });
  }
};

export const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate();
    if (!sale) return res.status(404).json({ message: "sale not found" })
    res.json(sale);
  } catch (error) {
    return res.status(404).json({ message: "sale not found" })
  }
};

export const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sale) return res.status(404).json({ message: "sale not found" })
    res.json(sale);
  } catch (error) {
    return res.status(404).json({ message: "sale not found" })
  }
};

export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: "sale not found" })
    res.json(sale);
  } catch (error) {
    return res.status(404).json({ message: "sale not found" })
  }
};
