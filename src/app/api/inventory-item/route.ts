import dbConnect from '@/lib/mongodb'
import InventoryItems from '@/models/InventoryItems'
import { NextResponse } from 'next/server'

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