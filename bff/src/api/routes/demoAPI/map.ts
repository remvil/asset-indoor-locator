import express from "express";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import path from "path";
import fs from "fs";
import {FeatureCollection, Feature} from "../../types";
import {Logger} from "../../../helpers/logger";

function handleMissedLocationError(requiredLocation: string, res: any) {
	if (!requiredLocation || (requiredLocation !== "salerno" && requiredLocation !== "battipaglia")) {
		return res.status(400).json({error: `Map Error: You need to specify right location parameter`});
	}
}

export const dummyMapRouter = express.Router();

/**
 * @swagger
 *
 *
 * /api/map/planimetry:
 *   get:
 *     summary: Restituisce la planimetria dell'edificio di una determinata location in formato geojson con una FeatureCollection
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: Il nome della posizione di cui si vuole la planimetria (salerno/battipaglia)
 *       - in: path
 *         name: flatNumber
 *         required: false
 *         schema:
 *           type: number
 *         description: Il numero del piano di cui si vuole recuperare la planimetria
 *     responses:
 *       200:
 *         description: Restituisce tutti gli elementi per renderizzare la planimetria dell'edificio
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
 *       - Map
 *     security:
 *       - Authorization: []
 *
 *  @swagger
 * components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
dummyMapRouter.get("/planimetry/:location/:plan?", (req: any, res: any) => {
	Logger.writeEvent(`Requested resources from  ${req.originalUrl} route `);

	const requiredLocation = req.params.location.toLowerCase();
	const requiredPlan = req.params.plan ?? 0;

	handleMissedLocationError(requiredLocation, res);

	const geojsonFilePath = !requiredPlan
		? path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/plan/plan0.geojson`)
		: path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/plan/plan${requiredPlan}.geojson`);

	// Utilizzo di RxJS per gestire la lettura del file
	const readFile$ = new Observable<string>((observer) => {
		fs.readFile(geojsonFilePath, "utf8", (err, data) => {
			if (err) {
				observer.error(`Map Error: Unable to read GeoJSON ${geojsonFilePath}`);
			} else {
				observer.next(data);
				observer.complete();
			}
		});
	});

	// Gestione della risposta con RxJS
	readFile$
		.pipe(
			map((data) => {
				const geojson = JSON.parse(data) as FeatureCollection;
				res.status(200).json(geojson);
			})
		)
		.subscribe(
			() => {},
			(error) => {
				Logger.writeException(error);
				res.status(500).json({error});
			}
		);
});

/**
 * @swagger
 * /api/map/assets/{location}:
 *   get:
 *     summary: Restituisce la FeatureCollection di tutti gli assets registrati di una determinata location.
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: Il nome della posizione di cui si vuole la planimetria (salerno/battipaglia)
 *     responses:
 *       200:
 *         description: Restituisce gli assets presenti in un geoJSON in una featureCollection.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/FeatureCollection'
 *       500:
 *         description: Errore del server. Non riesce a trovare la risorsa richiesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAssetsError'
 *     tags:
 *       - Map
 *     security:
 *       - Authorization: []
 */
dummyMapRouter.get("/assets/:location", (req: any, res: any) => {
	Logger.writeEvent(`Requested resources from  ${req.originalUrl} route `);

	const requiredLocation = req.params.location.toLowerCase();

	handleMissedLocationError(requiredLocation, res);

	const geojsonFilePath = path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/assets.geojson`);

	// Utilizzo di RxJS per gestire la lettura del file
	const readFile$ = new Observable<string>((observer) => {
		fs.readFile(geojsonFilePath, "utf8", (err, data) => {
			if (err) {
				observer.error(`Assets Error: Unable to read GeoJSON ${geojsonFilePath}`);
			} else {
				observer.next(data);
				observer.complete();
			}
		});
	});

	// Gestione della risposta con RxJS
	readFile$
		.pipe(
			map((data) => {
				const geojson = JSON.parse(data) as FeatureCollection;
				res.status(200).json(geojson);
			})
		)
		.subscribe(
			() => {},
			(error) => {
				Logger.writeException(error);
				res.status(500).json({error});
			}
		);
});

/**
 * @swagger
 * /api/map/assets/{location}}/{id}:
 *   get:
 *     summary: Restituisce l'asset con l'id passato per parametro.
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: Il nome della posizione di cui si vuole la planimetria (salerno/battipaglia)
 *       - in: path
 *         name: assetId
 *         required: false
 *         schema:
 *           type: number
 *         description: Il numero del piano di cui si vuole recuperare la planimetria
 *     responses:
 *       200:
 *         description: Restituisce un singolo asset con tutte le sue proprietà.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Feature'
 *       404:
 *         description: >
 *            Riporta un messaggio che specifica che non è possibile trovare la risorsa
 *            con l'id richiesto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Map
 *     security:
 *       - Authorization: []
 */
dummyMapRouter.get("/assets/:location/:id", (req: any, res: any) => {
	Logger.writeEvent(`Requested resources from  ${req.originalUrl} route `);

	const requiredLocation = req.params.location.toLowerCase();
	const requiredId = req.params.id;

	handleMissedLocationError(requiredLocation, res);

	const geojsonFilePath = path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/assets.geojson`);

	// Utilizzo di RxJS per gestire la lettura del file
	const readFile$ = new Observable<string>((observer) => {
		fs.readFile(geojsonFilePath, "utf8", (err, data) => {
			if (err) {
				observer.error(`Unable to read GeoJSON ${geojsonFilePath}`);
			} else {
				observer.next(data);
				observer.complete();
			}
		});
	});

	// Gestione della risposta con RxJS
	readFile$
		.pipe(
			map((data) => {
				const geojson = JSON.parse(data) as FeatureCollection;
				const features = geojson.features as Feature[];
				const foundFeature = features.find((feature) => feature.properties.id === requiredId);

				if (foundFeature) {
					res.status(200).json(foundFeature);
				} else {
					res.status(404).json({error: "Asset required not found"});
				}
			})
		)
		.subscribe(
			() => {},
			(error) => {
				Logger.writeException(error);
				res.status(500).json({error});
			}
		);
});

/**
 * @swagger
 *
 *
 * /api/map/shortestpath/demo:
 *   get:
 *     summary: Simula il calcolo di un percorso migliore per un determinato asset
 *     responses:
 *       200:
 *         description: Restituisce la Feature Collection contenente tutti il percorso migliore
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
dummyMapRouter.get("/shortestpath/demo", (req: any, res: any) => {
	Logger.writeEvent(`Requested resources from  ${req.originalUrl} route `);

	const geojsonFilePath = path.resolve(__dirname, `../../../../data/geojson/battipaglia/fake_best_path.geojson`);

	// Utilizzo di RxJS per gestire la lettura del file
	const readFile$ = new Observable<string>((observer) => {
		fs.readFile(geojsonFilePath, "utf8", (err, data) => {
			if (err) {
				observer.error(`Unable to read GeoJSON ${geojsonFilePath}`);
			} else {
				observer.next(data);
				observer.complete();
			}
		});
	});

	// Gestione della risposta con RxJS
	readFile$
		.pipe(
			map((data) => {
				const geojson = JSON.parse(data) as FeatureCollection;
				res.status(200).json(geojson);
			})
		)
		.subscribe(
			() => {},
			(error) => {
				Logger.writeException(error);
				res.status(500).json({error});
			}
		);
});
