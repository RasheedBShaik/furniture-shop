import mongoose from "mongoose";
import Product from "../models/product.model.js";

// 1. Get All Products (with filtering)
export const getProducts = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};
        if (category) {
            const searchPattern = category.replace(/\s/g, ""); 
            filter.category = { $regex: new RegExp(searchPattern, "i") };
        }

        const products = await Product.find(filter);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 2. Get Single Product
export const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id format" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error in fetching single product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 3. createProduct (FIXED for BSONError and Validation)
export const createProduct = async (req, res) => {
    const productData = req.body;

    // FIX 1: Prevent BSONError by removing _id if it's an empty string
    if (productData._id === "" || productData._id === null) {
        delete productData._id;
    }

    // Validate required fields
    if (!productData.name || !productData.image || !productData.description || !productData.category || !productData.price) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product:", error.message);
        
        // Handle Mongoose Validation Errors specifically (like the Category Enum error)
        if (error.name === "ValidationError") {
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 4. updateProduct
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 5. deleteProduct
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.error("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};