import dbConnect from '@/lib/mongodb'
import Categories from '@/models/Categories'
import InventoryItems from '@/models/InventoryItems'
import { CategoriesType } from '@/types/category'
import { InventoryItem } from '@/types/inventory'
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()

  try {
    const inventoryItems = await InventoryItems.find({}).lean();
    const categories = await Categories.find({}).lean();

    const formatted: InventoryItem[] = inventoryItems.map((inventoryItem: InventoryItem) => ({
      _id: inventoryItem._id.toString(),
      name: inventoryItem.name,
      quantity: inventoryItem.quantity,
      category: (categories.find(
        (category: CategoriesType) => category._id.toString() === inventoryItem.category.toString()
      )?.name) || "Unknown",
    }));

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

export async function PATCH(request: Request) {
  await dbConnect()

  try {
    const body: { _id: string; name: string, quantity: number, category_id: string } = await request.json();

    const updated = await InventoryItems.findByIdAndUpdate(
      body._id,
      { name: body.name, quantity: body.quantity, category: body.category_id },
      { returnDocument: 'after' }
    )

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Inventory Item not found' },
        { status: 404 }
      )
    }
    const category = await Categories.findOne({ _id: body.category_id }).lean();

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: updated._id.toString(),
          name: updated.name,
          quantity: updated.quantity,
          category: category.name
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}