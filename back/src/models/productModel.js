import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    categoria: { type: String },
    precio: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
