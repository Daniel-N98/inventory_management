import dbConnect from '@/lib/mongodb'
import Categories from '@/models/Categories';
import InventoryItems from '@/models/InventoryItems';
import { CategoriesType } from '@/types/category';
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()

  try {
    const categories = await Categories.find({}).lean()

    const formatted: CategoriesType[] = categories.map(cat => ({
      _id: cat._id.toString(),
      name: cat.name,
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
  // Check should be done to ensure the User is able to create Categories.
  try {
    const body = await request.json();
    const item = await Categories.create(body);

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
    const body: { _id: string; name: string } = await request.json();

    const updated = await Categories.findByIdAndUpdate(
      body._id,
      { name: body.name },
      { returnDocument: 'after' }
    )

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: updated._id.toString(),
          name: updated.name,
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

  try {
    const { _id }: { _id: string } = await request.json()
    const existingInventoryItems = await InventoryItems.find({ category: _id }).lean();
    if (existingInventoryItems.length > 0) {
      return NextResponse.json(
        { success: false, error: "Inventory Items exist with this category. Remove them first." },
        { status: 200 }
      );
    }
    const deleted = await Categories.findByIdAndDelete(_id);


    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
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