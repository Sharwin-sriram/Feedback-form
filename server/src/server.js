import dotenv from "dotenv";
dotenv.config();

import express from "express";
import USER_ROUTES from "./routes/loginRoutes.js";
import FB_ROUTES from "./routes/feedbackRoutes.js";
import ConnectDB from "./config/db.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// middleware
app.use(express.json());
app.use("/", USER_ROUTES);
app.use("/api", FB_ROUTES);

ConnectDB("login_db").then(() => {
  app.listen(5001, () => {
    console.log("Server started at localhost:5001");
  });
});
