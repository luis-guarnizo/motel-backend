import Sale from '../models/sale.model.js';
import User from "../models/user.model.js"; // Importar el modelo de Venta

// Controlador para crear una venta
export const createSale = async (req, res) => {
  try {
    console.log(req.body)
    const { sellerName, products } = req.body;

    console.log(products)

    // Calcular el precio total de la venta
    const totalAmount = products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
    console.log(totalAmount)

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

// module.exports = {
//   createSale,
// };
