import express from "express";
import userRouter from "/routers/user.mjs";
import morgan from "morgan";
import cors from "cors";

const app = express();


app.use(express.static(",/public"));
app.use(cors());
app.use(morgan(':method :url'));
app.use("users", userRouter);


app.listen(3000);