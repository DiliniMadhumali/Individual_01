const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    description: String,
    isComplete: Boolean
}, { timestamps: true });

const ItemModel = mongoose.model('Item', itemSchema);
module.exports = ItemModel;