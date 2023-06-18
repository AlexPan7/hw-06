import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";

import postRoutes from "./routes/posts";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "My Blog API",
			version: "1.0.0",
		},
	},
	apis: ["**/*.{ts,js}"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

mongoose
	.connect(process.env.DATABASE_URI || "")
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((error) => {
		console.log(`Could not connect to the database. Exit. ${error}`);
		process.exit();
	});

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
