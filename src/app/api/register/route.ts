import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
  }
  return client.db("inventory_management");
}

export async function POST(req: NextRequest) {
  const { name, email, password, role = "699cd39cb37779ad96ab9654" } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const db = await connectToDatabase();

  // check if user exists
  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // hash password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    role: role || "699cd39cb37779ad96ab9654", // default role
  });

  return NextResponse.json({ message: "User registered", id: result.insertedId });
}