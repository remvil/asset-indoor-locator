"use strict";
// import express, {Request, Response} from "express";
// import path from "path";
// import fs from "fs";
// export const pathsRouter = express.Router();
// /**
//  * @swagger
//  *
//  *
//  * /api/path:
//  *   get:
//  *     summary: Restituisce tutti i possibili percorsi per navigare all'interno dell'edificio
//  *     parameters:
//  *       - in: path
//  *         name: location
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Il nome della posizione di cui si vuole recuperare i possibili cammini [salerno o battipaglia]
//  *       - in: path
//  *         name: flatNumber
//  *         required: false
//  *         schema:
//  *           type: number
//  *         description: Il numero del piano
//  *     responses:
//  *       200:
//  *         description: Restituisce la Feature Collection contenente tutti i possibili segmenti percorribili
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
//  *       - Path
//  *     security:
//  *       - Authorization: []
//  *
//  *  @swagger
//  * components:
//  *   schema:
//  *    $ref: '#/components/schemas/GenericError'
//  *
//  */
// pathsRouter.get("/:location/:floor", (req: any, res: any) => {
// 	const requiredLocation = req.params.location.toLowerCase();
// 	if (requiredLocation !== "salerno" && requiredLocation !== "battipaglia")
// 		return res.status(500).json({error: `Location '${requiredLocation}' is not served for now`});
// 	const requiredFloor = req.params.floor ?? 0;
// 	if (+requiredFloor > 4) {
// 		return res.status(500).json({error: `Unable to find floor number ${requiredFloor}`});
// 	}
// 	const geojsonFilePath = !requiredLocation
// 		? path.resolve(__dirname, `../../../../data/geojson/battipaglia/plan4_paths.geojson`)
// 		: path.resolve(__dirname, `../../../../data/geojson/${requiredLocation}/plan4_paths.geojson`);
// 	fs.readFile(geojsonFilePath, "utf8", (err, data) => {
// 		if (err) {
// 			return res.status(500).json({error: `Unable to read GeoJSON ${geojsonFilePath}`});
// 		}
// 		const geojson = JSON.parse(data);
// 		res.json(geojson);
// 	});
// });
