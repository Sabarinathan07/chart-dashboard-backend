const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dashboard--backend.herokuapp.com/",
      "https://s--dashboard.herokuapp.com/",
    //   "http://localhost:5000/customer/"
      // "https://mern-auth-template-tutorial.netlify.app",
    ],
    credentials: true,
  })
);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_CONNECT);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

// set up routes

app.use("/auth", require("./routers/userRouter"));
// app.use("/customer", require("./routers/customerRouter"));
