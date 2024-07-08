"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRouter = void 0;
var express_1 = __importDefault(require("express"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var path_1 = __importDefault(require("path"));
var logger_1 = require("../../../helpers/logger");
function handleMissedLocationError(requiredLocation, res) {
    if (!requiredLocation || (requiredLocation !== "salerno" && requiredLocation !== "battipaglia")) {
        return res.status(400).json({ error: "Map Error: You need to specify right location parameter" });
    }
}
exports.mapRouter = express_1.default.Router();
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
exports.mapRouter.get("/planimetry/:location/:plan?", function (req, res) {
    var _a;
    logger_1.Logger.writeEvent("TEST: Hello from  '/map/planimetry/:location/:plan?' route ");
    var resp$ = (0, rxjs_1.of)("TEST: Hello from  '/map/planimetry/:location/:plan?' route ");
    var requiredLocation = req.params.location.toLowerCase();
    var requiredPlan = (_a = req.params.plan) !== null && _a !== void 0 ? _a : 0;
    handleMissedLocationError(requiredLocation, res);
    var geojsonFilePath = !requiredPlan
        ? path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan/plan0.geojson"))
        : path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan/plan").concat(requiredPlan, ".geojson"));
    // Utilizzo di RxJS per gestire la lettura del file
    // Gestione della risposta con RxJS
    resp$
        .pipe((0, operators_1.map)(function (data) {
        res.status(200).json({ message: data });
    }))
        .subscribe(function () { }, function (error) {
        res.status(500).json({ error: error });
    });
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
exports.mapRouter.get("/assets/:location", function (req, res) {
    var _a;
    logger_1.Logger.writeEvent("TEST: Hello from  '/map/assets/:location' route ");
    var resp$ = (0, rxjs_1.of)("TEST: Hello from  '/map/assets/:location' route ");
    var requiredLocation = req.params.location.toLowerCase();
    var requiredPlan = (_a = req.params.plan) !== null && _a !== void 0 ? _a : 0;
    handleMissedLocationError(requiredLocation, res);
    var geojsonFilePath = !requiredPlan
        ? path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan/plan0.geojson"))
        : path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan/plan").concat(requiredPlan, ".geojson"));
    // Gestione della risposta con RxJS
    resp$
        .pipe((0, operators_1.map)(function (data) {
        res.status(200).json({ message: data });
    }))
        .subscribe(function () { }, function (error) {
        res.status(500).json({ error: error });
    });
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
exports.mapRouter.get("/assets/:location/:id", function (req, res) {
    var _a;
    logger_1.Logger.writeEvent("TEST: Hello from  '/map/assets/:location' route ");
    var resp$ = (0, rxjs_1.of)("TEST: Hello from  '/map/assets/:location' route ");
    var requiredLocation = req.params.location.toLowerCase();
    var requiredPlan = (_a = req.params.plan) !== null && _a !== void 0 ? _a : 0;
    handleMissedLocationError(requiredLocation, res);
    var geojsonFilePath = !requiredPlan
        ? path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan/plan0.geojson"))
        : path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan/plan").concat(requiredPlan, ".geojson"));
    resp$
        .pipe((0, operators_1.map)(function (data) {
        res.status(200).json({ message: data });
    }))
        .subscribe(function () { }, function (error) {
        res.status(500).json({ error: error });
    });
});
