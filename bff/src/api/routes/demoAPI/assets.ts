import {FeatureCollection, Feature} from "./../../types";
import express from "express";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Logger} from "../../../helpers/logger";
import path from "path";
import fs from "fs";
var _ = require("lodash");

function handleMissedLocationError(requiredLocation: string, res: any) {
	if (!requiredLocation || (requiredLocation !== "salerno" && requiredLocation !== "battipaglia")) {
		return res.status(400).json({error: `Map Error: You need to specify right location parameter`});
	}
}

export const dummyAssetsRouter = express.Router();

/**
 * @swagger
 * /api/assets/list/{location}:
 *   get:
 *     summary: Restituisce la lista di tutti gli asset di una determinata location
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restituisce la lista degli asset
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HospitalAsset'
 *       404:
 *         description: >
 *            Riporta un messaggio che specifica che non è possibile trovare la risorsa richiesta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *     tags:
 *       - Assets
 *     security:
 *       - Authorization: []
 */
dummyAssetsRouter.get("/list/:location", (req: any, res: any) => {
	Logger.writeEvent(`Requested resources from  ${req.originalUrl} route `);

	const requiredLocation = req.params.location.toLowerCase();

	handleMissedLocationError(requiredLocation, res);

	const geoJSONAssetsList = path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/assets.geojson`);
	const assets$ = new Observable((observer) => {
		fs.readFile(geoJSONAssetsList, "utf8", (err: any, data: string) => {
			if (err) {
				observer.error({error: "Assets not Found"});
			}
			const dataObj: FeatureCollection = JSON.parse(data);
			const featuresArray = dataObj.features;
			let assetsFiltered = featuresArray.map((feature) =>
				_.pick(feature.properties, ["id", "name", "description", "batteryLevel", "tagId", "floor", "lon", "lat"])
			);
			observer.next(assetsFiltered);
			observer.complete();
		});
	});

	// Gestione della risposta con RxJS
	assets$
		.pipe(
			map((assets) => {
				res.status(200).json(assets);
			})
		)
		.subscribe(
			() => {},
			(error) => {
				Logger.writeException(error);
				res.status(404).json(error);
			}
		);
});
