import "dotenv/config";
import express from "express";
import connectDB from "./db";
import globalRouter from "./global-router";
import { logger } from "./logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);
app.use(express.json());
app.use("/api/v1/", globalRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (request, response) => {
	response.send("Please go to /api/v1/events");
});

app.listen(PORT, () => {
	console.log(`Server runs at http://localhost:${PORT}`);
});
