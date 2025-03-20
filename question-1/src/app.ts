import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware/middleware";
import routes from "./routes/routes.js";

dotenv.config(); //allows us to use vars in .env file (security purposes)
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/numbers", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Average Calculator running on ${PORT}`);
});
