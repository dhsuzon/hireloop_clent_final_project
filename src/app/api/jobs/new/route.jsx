import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL);
const db = client.db("hireloop");

export async function POST(request) {
  try {
    const job = await request.json();

    const result = await db.collection("jobs").insertOne({
      ...job,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json(
      { acknowledged: false, error: error?.message ?? "Failed to create job." },
      { status: 500 }
    );
  }
}
