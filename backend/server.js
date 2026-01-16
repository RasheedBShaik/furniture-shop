import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // 1. Import cors
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Enable CORS
app.use(cors({
    origin: "http://localhost:5173"||"https://1s8dbpgj-5173.inc1.devtunnels.ms", 
    // Allow your React/Vite dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});