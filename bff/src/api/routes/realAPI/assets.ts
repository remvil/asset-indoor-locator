import express from "express";
import {Logger} from "../../../helpers/logger";
import {of} from "rxjs";
import {map} from "rxjs/operators";

const assetsRouter = express.Router();

assetsRouter.get("/:location?", (req: any, res: any) => {
	Logger.writeEvent("TEST: Hello from  '/assets//:location?' route ");
	const resp$ = of("TEST: Hello from  '/assets//:location?' route ");

	// Gestione della risposta con RxJS
	resp$
		.pipe(
			map((data) => {
				res.status(200).json({message: data});
			})
		)
		.subscribe(
			() => {},
			(error) => {
				res.status(404).json(error);
			}
		);
});

export {assetsRouter};
