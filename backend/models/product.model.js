import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    label:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    originalPrice:{
        type:Number,
        required:false
    },
    category: {
        type: String,
        required: true,
        enum: ['Dining','Living Room', 'Bedroom', ]
    },
    stock: {
        type: Number,
        default: 0
    } 
},{
    timestamps:true // createdAt, updatedAT
});

const Product = mongoose.model('Product',productSchema);

export default Product;