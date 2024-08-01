import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

import { routes } from "./routes";
import { setupMongo } from "./database";
import { errorHandler } from "./middleware/error-handler.middleware";

setupMongo().then(() => {
	const app = express();
	const port = 3333;

	app.use(
		cors({
			origin: process.env.FRONT_URL,
		}),
	);
	app.use(json());
	app.use(routes);
	app.use(errorHandler);

	app.listen(port, "0.0.0.0", () =>
		console.log("🛫 App rodando na porta 3333"),
	);
});
