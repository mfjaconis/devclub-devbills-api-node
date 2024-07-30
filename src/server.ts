import "dotenv/config";
import express, { json } from "express";

import { routes } from "./routes";
import { setupMongo } from "./database";
import { errorHandler } from "./middleware/error-handler.middleware";

setupMongo().then(() => {
	const app = express();
	const port = 3333;

	app.use(json());
	app.use(routes);
	app.use(errorHandler);

	app.listen(port, "0.0.0.0", () =>
		console.log("🛫 App rodando na porta 3333"),
	);
});
