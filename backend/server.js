import express from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import mainRouter from "./routes/mainRouter.js";

const app = express();
const PORT = 6969;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at PORT: ${PORT}`);
});
