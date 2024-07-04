// import express from "express";
// import path from "path";
// import fs from "fs";
// import {Feature} from "../../types";

// function handleMissedLocationError(requiredLocation: string, res: any) {
// 	if (!requiredLocation || (requiredLocation !== "salerno" && requiredLocation !== "battipaglia")) {
// 		return res.status(400).json({error: `Map Error: You need to specify right location parameter`});
// 	}
// }

// export const mapRouter = express.Router();

// /**
//  * @swagger
//  *
//  *
//  * /api/map/planimetry:
//  *   get:
//  *     summary: Restituisce la planimetria dell'edificio di una determinata location in formato geojson con una FeatureCollection
//  *     parameters:
//  *       - in: path
//  *         name: location
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Il nome della posizione di cui si vuole la planimetria (salerno/battipaglia)
//  *       - in: path
//  *         name: flatNumber
//  *         required: false
//  *         schema:
//  *           type: number
//  *         description: Il numero del piano di cui si vuole recuperare la planimetria
//  *     responses:
//  *       200:
//  *         description: Restituisce tutti gli elementi per renderizzare la planimetria dell'edificio
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/FeatureCollection'
//  *       500:
//  *         description: Errore del server. Non riesce a trovare la risorsa richiesta
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/GenericError'
//  *     tags:
//  *       - Map
//  *     security:
//  *       - Authorization: []
//  *
//  *  @swagger
//  * components:
//  *   schema:
//  *    $ref: '#/components/schemas/GenericError'
//  *
//  */
// mapRouter.get("/planimetry/:location/:plan?", (req: any, res) => {
// 	const requiredLocation = req.params.location.toLowerCase();
// 	const requiredPlan = req.params.plan ?? 0;

// 	if (!requiredLocation || (requiredLocation !== "salerno" && requiredLocation !== "battipaglia")) {
// 		return res.status(400).json({error: `Map Error: You need to specify right location parameter`});
// 	}

// 	const geojsonFilePath = !requiredPlan
// 		? path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/plan/plan0.geojson`)
// 		: path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/plan/plan${requiredPlan}.geojson`);
// 	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
// 		if (err) {
// 			return res.status(500).json({error: `Map Error: Unable to read GeoJSON ${geojsonFilePath}`});
// 		}
// 		const geojson = JSON.parse(data);
// 		res.json(geojson);
// 	});
// });

// /**
//  * @swagger
//  * /api/map/assets:
//  *   get:
//  *     summary: Restituisce la FeatureCollection di tutti gli assets registrati di una determinata location.
//  *     parameters:
//  *       - in: path
//  *         name: location
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Il nome della posizione di cui si vuole la planimetria (salerno/battipaglia)
//  *     responses:
//  *       200:
//  *         description: Restituisce gli assets presenti in un geoJSON in una featureCollection.
//  *         content:
//  *           application/json:
//  *             schema:
//  *              $ref: '#/components/schemas/FeatureCollection'
//  *       500:
//  *         description: Errore del server. Non riesce a trovare la risorsa richiesta
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/GetAssetsError'
//  *     tags:
//  *       - Map
//  *     security:
//  *       - Authorization: []
//  */
// mapRouter.get("/assets/:location", (req: any, res: any) => {
// 	const requiredLocation = req.params.location.toLowerCase();
// 	if (!requiredLocation) {
// 		return res.status(500).json({error: `You need to specify required location string`});
// 	}
// 	const geojsonFilePath = path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/assets.geojson`);
// 	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
// 		if (err) {
// 			return res.status(500).json({error: `Assets Error: Unable to read GeoJSON ${geojsonFilePath}`});
// 		}
// 		const geojson = JSON.parse(data);
// 		res.json(geojson);
// 	});
// });

// /**
//  * @swagger
//  * /api/map/assets/{location}}/{id}:
//  *   get:
//  *     summary: Restituisce l'asset con l'id passato per parametro.
//  *     parameters:
//  *       - in: path
//  *         name: location
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Il nome della posizione di cui si vuole la planimetria (salerno/battipaglia)
//  *       - in: path
//  *         name: assetId
//  *         required: false
//  *         schema:
//  *           type: number
//  *         description: Il numero del piano di cui si vuole recuperare la planimetria
//  *     responses:
//  *       200:
//  *         description: Restituisce un singolo asset con tutte le sue proprietà.
//  *         content:
//  *           application/json:
//  *             schema:
//  *              $ref: '#/components/schemas/Feature'
//  *       404:
//  *         description: >
//  *            Riporta un messaggio che specifica che non è possibile trovare la risorsa
//  *            con l'id richiesto
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/GenericError'
//  *     tags:
//  *       - Map
//  *     security:
//  *       - Authorization: []
//  */
// mapRouter.get("/assets/:location/:id", (req: any, res: any) => {
// 	const requiredLocation = req.params.location.toLowerCase();
// 	if (!requiredLocation) {
// 		return res.status(500).json({error: `You need to specify required location string`});
// 	}
// 	const requiredId = req.params.id;
// 	if (!requiredLocation) {
// 		return res.status(500).json({error: `You need to specify required asset ID`});
// 	}

// 	const geojsonFilePath = path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/assets.geojson`);
// 	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
// 		if (err) {
// 			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
// 		}
// 		const geojson = JSON.parse(data);
// 		const feats: Feature[] = geojson.features;
// 		const foundFeature = feats.find((feature) => feature.properties.id === requiredId);

// 		if (foundFeature) {
// 			res.status(200).json(foundFeature);
// 		} else {
// 			res.status(404).json({error: "Asset required not found"});
// 		}
// 	});
// });

// /**
//  * @swagger
//  * /api/map/battipaglia/assets:
//  *   get:
//  *     summary: Restituisce gli oggetti geoGson di tutti gli asset presenti.
//  *     responses:
//  *       200:
//  *         description: Restituisce gli assets presenti negli uffici di battipaglia.
//  *         content:
//  *           application/json:
//  *             schema:
//  *              $ref: '#/components/schemas/FeatureCollection'
//  *       500:
//  *         description: Errore del server. Non riesce a trovare la risorsa richiesta
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/GetAssetsError'
//  *     tags:
//  *       - Map
//  *     security:
//  *       - Authorization: []
//  */
// mapRouter.get("/battipaglia/assets", (req, res) => {
// 	const geojsonFilePath = path.resolve(__dirname, "../../../data/geojson/battipaglia/infotelPlan4_assets.geojson");
// 	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
// 		if (err) {
// 			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
// 		}
// 		const geojson = JSON.parse(data);
// 		res.json(geojson);
// 	});
// });
