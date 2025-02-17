import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();
const port = process.env.PORT;
import userRouter from "./src/routes/user.routes.js";
import connectdb from "./src/db/index.js";

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("Hello Micro");
});

connectdb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Is Running At Port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
