import mongoose from 'mongoose';

const InventoryItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  },
  category: { // Replace with ref to Categories table.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  }
});

export default mongoose.models.Inventory_item || mongoose.model('Inventory_item', InventoryItemsSchema);