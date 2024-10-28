import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, MongoServerError } from "mongodb";
const CONNECTION_STRING = process.env["mogodb_connect_string"]

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const client = await MongoClient.connect(CONNECTION_STRING ?? "");
  const db = await client.db("blog");
  if (req.method == 'GET') {
    var result = await db.collection("demo").find().toArray();
    res.status(200).json(result);
  } else if(req.method == 'POST') {
    try {
      const newDes = req.body['description']
      var updateResult = await db.collection("demo").updateOne({ version: "1.0.0" }, { $set: { description: newDes }})
      res.status(200).json(updateResult);
    } catch(error) {
      if (error instanceof MongoServerError) {
        res.status(405).json('Wrong parameter')
      }
      throw error;
    }
  }
};
