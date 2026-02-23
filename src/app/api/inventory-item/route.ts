import dbConnect from '@/lib/mongodb'
import InventoryItems from '@/models/InventoryItems'
import { InventoryItem } from '@/types/inventory'
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()

  try {
    const inventoryItems = await InventoryItems.find({}).lean()

    const formatted: InventoryItem[] = inventoryItems.map((inventoryItem: InventoryItem) => ({
      id: inventoryItem.id.toString(),
      name: inventoryItem.name,
      quantity: inventoryItem.quantity,
      category: inventoryItem.category,
    }))

    return NextResponse.json(
      { success: true, data: formatted },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  await dbConnect()
  // Check should be done to ensure the User is able to create InventoryItems.
  try {
    const body = await request.json()
    const item = await InventoryItems.create(body)

    return NextResponse.json(
      { success: true, data: item },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}