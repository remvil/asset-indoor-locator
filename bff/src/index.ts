// import {swaggerJSDoc} from "swagger-jsdoc";
import express, {Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import {apiRouter} from "./api/index";
import {CORSHOSTS, ENVIRONMENT, CONTAINER_SERVER_PORT} from "./envconfig";
import {Logger, initLogger} from "./helpers/logger";
import {swaggerSpec} from "./swagger";
import path from "path";

if (!CONTAINER_SERVER_PORT || !ENVIRONMENT) process.exit(1);

initLogger();
const app = express();

app.use(express.json());
if (CORSHOSTS) {
	app.use(cors());
	app.options(CORSHOSTS, cors());
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", apiRouter);

// Content Security Policy (CSP) Middleware on  "/"
app.get("/", (_req: Request, res: Response, next) => {
	res.sendFile(path.join(__dirname, "index.html"));
	res.setHeader(
		"Content-Security-Policy",
		"default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:"
	);
	// next();
});

// Avvia il server
app.listen(CONTAINER_SERVER_PORT, () => {
	Logger.writeEvent(`BFF listening at http://localhost:${CONTAINER_SERVER_PORT} on ${ENVIRONMENT} environment`);
});
