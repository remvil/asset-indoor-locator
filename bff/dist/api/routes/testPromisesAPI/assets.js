"use strict";
// import express from "express";
// import {getHospitalFakeAssets} from "../../../helpers/functions";
// export const assetsRouter = express.Router();
// /**
//  * @swagger
//  * /api/assets/{location}:
//  *   get:
//  *     summary: Restituisce la lista di tutti gli asset di una determinata location
//  *     responses:
//  *       200:
//  *         description: Restituisce la lista degli asset
//  *         content:
//  *           application/json:
//  *             schema:
//  *              $ref: '#/components/schemas/HospitalAsset'
//  *       404:
//  *         description: >
//  *            Riporta un messaggio che specifica che non è possibile trovare la risorsa richiesta
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/GenericError'
//  *     tags:
//  *       - Assets
//  *     security:
//  *       - Authorization: []
//  */
// assetsRouter.get("/:location?", (req: any, res: any) => {
// 	const assets = getHospitalFakeAssets();
// 	if (assets) res.status(200).json(assets);
// 	else res.status(404).json({error: "Assets not Found"});
// });
