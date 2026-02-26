import dbConnect from '@/lib/mongodb'
import { requireAuth } from '@/lib/requireAuth'
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
      createdAt: inventoryItem.createdAt,
      updatedAt: inventoryItem.updatedAt
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
  // Check user authentication
  const auth = await requireAuth("inventory-items", "createRole");
  if (typeof auth !== "boolean" && !(auth && "user" in auth)) return auth as NextResponse;

  try {
    const body = await request.json();
    const item = await InventoryItems.create(body);
    const category = await Categories.findOne({ _id: item.category }).lean();

    const formattedItem = {
      ...item.toObject(),
      category: category?.name || "Unknown",
    };

    return NextResponse.json(
      { success: true, data: formattedItem },
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
  // Check user authentication
  const auth = await requireAuth("inventory-items", "editRole");
  if (typeof auth !== "boolean" && !(auth && "user" in auth)) return auth as NextResponse;

  try {
    const body: { _id: string; name: string, quantity: number, category: string } = await request.json();
    const categoryRes = await Categories.findOne({ name: body.category }).lean({});

    const updated = await InventoryItems.findByIdAndUpdate(
      body._id,
      { name: body.name, quantity: body.quantity, category: categoryRes._id },
      { returnDocument: 'after' }
    )

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Inventory Item not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      {
        success: true,
        data: {
          _id: updated._id.toString(),
          name: updated.name,
          quantity: updated.quantity,
          category: body.category
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

export async function DELETE(request: Request) {
  await dbConnect()
  // Check user authentication
  const auth = await requireAuth("inventory-items", "editRole");
  if (typeof auth !== "boolean" && !(auth && "user" in auth)) return auth as NextResponse;

  try {
    const { _id }: { _id: string } = await request.json()

    const deleted = await InventoryItems.findByIdAndDelete(_id)

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Inventory Item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, data: { _id } },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 400 }
    )
  }
}