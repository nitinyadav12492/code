import express from "express";
const app = express();


import 'dotenv/config';
import authRouter from "./router/auth-router.js";
import contactRouter from "./router/contact-router.js";
import adminRoute from "./router/admin-route.js"
import serviceRouter from "./router/service-route.js"
import connectDb from "./ulits/db.js";
import cors from "cors";

import errorMiddleware from "./Middleware/error-middleware.js";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
// app.use("/api/data", serviceRouter);

app.use("/api/admin/services", serviceRouter);
app.use("/api/admin",adminRoute)
app.use(errorMiddleware);

const PORT = 3000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB error:', err.message);
    process.exit(1);
  });