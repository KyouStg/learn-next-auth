import { NextRequest, NextResponse } from "next/server";
import {mongoClient} from "@/app/features/auth/lib/mongoClient";

export async function POST(req: Request, res: NextResponse) {
  const { id, username, email, createdAt } = await req.json();
  const client = await mongoClient.connect();

  try {
    const database = client.db('account');
    const collection = database.collection('members');

    const result = await collection.insertOne({
      id: id,
      username: username,
      email: email,
      createdAt: createdAt,
    });

    console.log(id, username, email, createdAt);
    return NextResponse.json({ message: "Updated successfully" }, {status: 200});

  } catch (error:any) {
    console.log("Error inserting document: ", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "既に存在するユーザーです。" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });



  } finally {
    await client.close();
  }
}
