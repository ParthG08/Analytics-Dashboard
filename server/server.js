import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

async function main() {
  console.log("script is running");
  try {
    await mongoose.connect(
      "mongodb+srv://pgparth08:4YWN8lUNIS8HByCU@datacluster.hxieqzg.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=DataCluster",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("finished the connecting block");
    console.log("connected to mongodb");
  } catch (err) {
    console.error("Connection error", err);
    return;
  }

  const db = mongoose.connection;

  const mySchema = new mongoose.Schema(
    {},
    { collection: "mycollection", strict: false }
  );
  const MyModel = mongoose.model("MyModel", mySchema);

  app.get("/api/data", async (req, res) => {
    try {
      const data = await MyModel.find({});
      res.json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  console.log("does run");
}

main();
