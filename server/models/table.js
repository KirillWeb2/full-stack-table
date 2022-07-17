import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
    name: { type: String },
    quantity: { type: Number },
    distance: { type: Number },
    date: { type: Date }
})

export default mongoose.model('table', TableSchema)