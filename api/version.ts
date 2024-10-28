import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
const CONNECTION_STRING = process.env["mogodb_connect_string"]

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const client = await MongoClient.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db("blog");
  var result = await db.collection("demo").find().toArray();
  console.log(result);
  res.status(200).json(result);
};
