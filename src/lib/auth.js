import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin, admmin } from "better-auth/plugins";

const uri = process.env.DB_URL;

const client = new MongoClient(uri);
const db = client.db("hireloop");

export const auth = betterAuth({
  plugins: [admin()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        default: "seekar",
      },
      plan: {
        default: "seekar_free",
      },
    },
  },
});
