import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceReception: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Product', productSchema);
