import Product from '../models/productModel.js';

export const registerProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidad } = req.body;

        // Verificar si el producto ya existe con el mismo nombre
        const existingProduct = await Product.findOne({ nombre });
        if (existingProduct) {
            return res.status(400).json({ message: 'Ya existe un producto con el mismo nombre.' });
        }

        // Crear un nuevo producto
        const newProduct = new Product({ nombre, descripcion, precio, cantidad });
        await newProduct.save();

        // Enviar respuesta
        res.status(201).json({ message: 'Producto registrado exitosamente', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el producto' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};
