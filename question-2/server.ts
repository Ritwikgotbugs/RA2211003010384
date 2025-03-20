import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getTopUsers, getPosts } from "./controller/controller";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/users", getTopUsers);
app.get("/posts", getPosts);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
