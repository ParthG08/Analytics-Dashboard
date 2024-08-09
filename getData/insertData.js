import { MongoClient } from 'mongodb';
import jsonData from './jsondata.json'

const uri =
  "mongodb+srv://pgparth08:4YWN8lUNIS8HByCU@datacluster.hxieqzg.mongodb.net/?retryWrites=true&w=majority&appName=DataCluster";

async function insertData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("reached")
    const database = client.db("mydatabase");
    const collection = database.collection("mycollection");

    const result = await collection.insertMany(jsonData);

    console.log(`${result.insertedCount} documents were inserted`);
  } catch(error){
    console.log(error);
  }finally {
    await client.close();
  } 
}

insertData().catch(console.error);
