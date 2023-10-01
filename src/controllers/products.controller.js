import Product from '../models/product.model.js'; // Importar el modelo de Venta

// Controlador para crear una venta
export const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, priceReception } = req.body;

    const newProduct = new Product({
      name,
      category,
      quantity,
      price,
      priceReception,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Producto creada exitosamente', savedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la producto' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate();
    res.json(products);
  } catch (error) {
    return res.status(404).json({message: "something went wrong"});
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate();
    if(!product) return res.status(404).json({message: "Product not found"})
    res.json(product);
  } catch (error) {
    return res.status(404).json({message: "Product not found"})
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if(!product) return res.status(404).json({message: "Product not found"})
    res.json(product);
  } catch (error) {
    return res.status(404).json({message: "Product not found"})
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({message: "Product not found"})
    res.json(product.name);
  } catch (error) {
    return res.status(404).json({message: "Product not found"})
  }
};
