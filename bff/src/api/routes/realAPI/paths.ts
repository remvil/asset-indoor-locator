import express from "express";
import {Logger} from "../../../helpers/logger";
import {of} from "rxjs";
import {map} from "rxjs/operators";

export const pathsRouter = express.Router();

/**
 * @swagger
 *
 *
 * /api/path:
 *   get:
 *     summary: Restituisce tutti i possibili percorsi per navigare all'interno dell'edificio
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: Il nome della posizione di cui si vuole recuperare i possibili cammini [salerno o battipaglia]
 *       - in: path
 *         name: flatNumber
 *         required: false
 *         schema:
 *           type: number
 *         description: Il numero del piano
 *     responses:
 *       200:
 *         description: Restituisce la Feature Collection contenente tutti i possibili segmenti percorribili
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureCollection'
 *       500:
 *         description: Errore del server. Non riesce a trovare la risorsa richiesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Path
 *     security:
 *       - Authorization: []
 *
 *  @swagger
 * components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
pathsRouter.get("/:location/:floor", (req: any, res: any) => {
	Logger.writeEvent("TEST: Hello from  '/:location/:floor' route ");
	const resp$ = of("TEST: Hello from  '/:location/:floor' route ");

	const requiredLocation = req.params.location.toLowerCase();
	const requiredFloor = req.params.floor ?? 0;

	if (requiredLocation !== "salerno" && requiredLocation !== "battipaglia") {
		return res.status(500).json({error: `Location '${requiredLocation}' is not served for now`});
	}

	if (+requiredFloor > 4) {
		return res.status(500).json({error: `Unable to find floor number ${requiredFloor}`});
	}

	// const geojsonFilePath = !requiredLocation
	// 	? path.resolve(__dirname, `../../../../data/geojson/battipaglia/plan4_paths.geojson`)
	// 	: path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/plan4_paths.geojson`);

	// // Utilizzo di RxJS per gestire la lettura del file
	// const readFile$ = new Observable<string>((observer) => {
	// 	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
	// 		if (err) {
	// 			observer.error(`Unable to read GeoJSON ${geojsonFilePath}`);
	// 		} else {
	// 			observer.next(data);
	// 			observer.complete();
	// 		}
	// 	});
	// });

	// Gestione della risposta con RxJS
	resp$
		.pipe(
			map((data) => {
				// const geojson = JSON.parse(data) as FeatureCollection;
				res.status(200).json({message: data});
			})
		)
		.subscribe(
			() => {},
			(error) => {
				res.status(500).json({error});
			}
		);
});
