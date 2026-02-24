export type InventoryItem = {
  _id: string,
  name: string,
  quantity: number,
  category: string,
  createdAt: Date,
  updatedAt: Date,
}

export type CreatedInventoryItem = {
  name: string,
  quantity: number,
  category: string;
}