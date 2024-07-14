import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/indexRoute.js";
import handleError from "./middlewares/handleError.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.info("Connected MongoDB !");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.info("MongoDB disconnected !");
});
mongoose.connection.on("connected", () => {
  console.info("MongoDB connected !");
});

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/auth", routes.authRoute);
app.use("/api/store", routes.storeRoute);
app.use("/api/role", routes.roleRoute);
app.use("/api/customer", routes.customerRoute);

// Handle Error
app.use(handleError);

// Handle URL Not Found
app.all("*", (req, res) => {
  return res.status(500).json({
    status: false,
    message: "URL Not Found",
    stack: req.originalUrl + " Url Not Found",
  });
});

app.listen(PORT, () => {
  connect();
  console.log("Server started on port 8800");
});
