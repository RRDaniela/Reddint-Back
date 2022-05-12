import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import fs from "fs";

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reddint API",
      version: "1.0",
    },
    servers: [
      {
        url: "http://localhost:",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.ts")}`],
};

dotenv.config();

const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  console.error("MONGODB_URL is not set");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use(cors());
app.use('/api/v1', router);
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);

mongoose
  .connect(mongodbUrl)
  .then((_result) => {
    console.log("[DB] Connected to MongoDB");

    app.listen(port, () => {
      console.log(`[EXPRESS] Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

const swagJson = swaggerJsDoc(swaggerSpec);

fs.writeFile("./swagger.json", JSON.stringify(swagJson, null, 2), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
