import express from "express";
// 1. Add getProduct to the curly braces here
import { 
  getProducts, 
  getProduct, // <--- Add this
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/product.controller.js";

const router = express.Router();

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// Create Product
router.post("/", createProduct);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

export default router;