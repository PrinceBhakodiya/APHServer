const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  ItemName: String,
  Unit: String,
  PurchasePrice: Number,
  SalePrice: Number,
  Category: String
});

// Define the model based on the schema
const ItemModel = mongoose.model('MYItems', itemSchema,'MYItems');

module.exports = ItemModel;