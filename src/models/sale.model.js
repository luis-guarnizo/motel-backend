import mongoose from 'mongoose';
import Product from './product.model.js'
// Importar el modelo de Producto

const saleSchema = new mongoose.Schema({
  sellerName: {
    type: String,
    required: true,
  },
  products: [Product.schema], // Usar el esquema de Producto para los productos
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Sale', saleSchema);

