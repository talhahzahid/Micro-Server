import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Micro");
});

app.listen(process.env.PORT, () => {
  console.log("Server Is Running At Port", process.env.PORT);
});
