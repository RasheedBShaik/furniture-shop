import mongoose from "mongoose";
import Product from "../models/product.model.js";

// 1. Updated getProducts to handle category filtering
export const getProducts = async (req, res) => {
    try {
        const { category } = req.query; // e.g., "Livingroom"

        let filter = {};
        if (category) {
            // This Regex removes spaces from the search term and looks for 
            // a match in the database regardless of spaces or case.
            // Example: "Livingroom" will match "Living" or "living"
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

// 2. createProduct (remains the same but with better error logging)
export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.image || !product.description || !product.category || !product.price) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 3. updateProduct
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 4. deleteProduct
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