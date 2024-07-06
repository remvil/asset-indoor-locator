"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyMapRouter = void 0;
var express_1 = __importDefault(require("express"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var logger_1 = require("../../../helpers/logger");
function handleMissedLocationError(requiredLocation, res) {
    if (!requiredLocation || (requiredLocation !== "salerno" && requiredLocation !== "battipaglia")) {
        return res.status(400).json({ error: "Map Error: You need to specify right location parameter" });
    }
}
exports.dummyMapRouter = express_1.default.Router();
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
exports.dummyMapRouter.get("/planimetry/:location/:plan?", function (req, res) {
    var _a;
    logger_1.Logger.writeEvent("Requested resources from  ".concat(req.originalUrl, " route "));
    var requiredLocation = req.params.location.toLowerCase();
    var requiredPlan = (_a = req.params.plan) !== null && _a !== void 0 ? _a : 0;
    handleMissedLocationError(requiredLocation, res);
    var geojsonFilePath = !requiredPlan
        ? path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan/plan0.geojson"))
        : path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan/plan").concat(requiredPlan, ".geojson"));
    // Utilizzo di RxJS per gestire la lettura del file
    var readFile$ = new rxjs_1.Observable(function (observer) {
        fs_1.default.readFile(geojsonFilePath, "utf8", function (err, data) {
            if (err) {
                observer.error("Map Error: Unable to read GeoJSON ".concat(geojsonFilePath));
            }
            else {
                observer.next(data);
                observer.complete();
            }
        });
    });
    // Gestione della risposta con RxJS
    readFile$
        .pipe((0, operators_1.map)(function (data) {
        var geojson = JSON.parse(data);
        res.status(200).json(geojson);
    }))
        .subscribe(function () { }, function (error) {
        logger_1.Logger.writeException(error);
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
exports.dummyMapRouter.get("/assets/:location", function (req, res) {
    logger_1.Logger.writeEvent("Requested resources from  ".concat(req.originalUrl, " route "));
    var requiredLocation = req.params.location.toLowerCase();
    handleMissedLocationError(requiredLocation, res);
    var geojsonFilePath = path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/assets.geojson"));
    // Utilizzo di RxJS per gestire la lettura del file
    var readFile$ = new rxjs_1.Observable(function (observer) {
        fs_1.default.readFile(geojsonFilePath, "utf8", function (err, data) {
            if (err) {
                observer.error("Assets Error: Unable to read GeoJSON ".concat(geojsonFilePath));
            }
            else {
                observer.next(data);
                observer.complete();
            }
        });
    });
    // Gestione della risposta con RxJS
    readFile$
        .pipe((0, operators_1.map)(function (data) {
        var geojson = JSON.parse(data);
        res.status(200).json(geojson);
    }))
        .subscribe(function () { }, function (error) {
        logger_1.Logger.writeException(error);
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
exports.dummyMapRouter.get("/assets/:location/:id", function (req, res) {
    logger_1.Logger.writeEvent("Requested resources from  ".concat(req.originalUrl, " route "));
    var requiredLocation = req.params.location.toLowerCase();
    var requiredId = req.params.id;
    handleMissedLocationError(requiredLocation, res);
    var geojsonFilePath = path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/assets.geojson"));
    // Utilizzo di RxJS per gestire la lettura del file
    var readFile$ = new rxjs_1.Observable(function (observer) {
        fs_1.default.readFile(geojsonFilePath, "utf8", function (err, data) {
            if (err) {
                observer.error("Unable to read GeoJSON ".concat(geojsonFilePath));
            }
            else {
                observer.next(data);
                observer.complete();
            }
        });
    });
    // Gestione della risposta con RxJS
    readFile$
        .pipe((0, operators_1.map)(function (data) {
        var geojson = JSON.parse(data);
        var features = geojson.features;
        var foundFeature = features.find(function (feature) { return feature.properties.id === requiredId; });
        if (foundFeature) {
            res.status(200).json(foundFeature);
        }
        else {
            res.status(404).json({ error: "Asset required not found" });
        }
    }))
        .subscribe(function () { }, function (error) {
        logger_1.Logger.writeException(error);
        res.status(500).json({ error: error });
    });
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
exports.dummyMapRouter.get("/shortestpath/demo", function (req, res) {
    logger_1.Logger.writeEvent("Requested resources from  ".concat(req.originalUrl, " route "));
    var geojsonFilePath = path_1.default.resolve(__dirname, "../../../../data/geojson/battipaglia/fake_best_path.geojson");
    // Utilizzo di RxJS per gestire la lettura del file
    var readFile$ = new rxjs_1.Observable(function (observer) {
        fs_1.default.readFile(geojsonFilePath, "utf8", function (err, data) {
            if (err) {
                observer.error("Unable to read GeoJSON ".concat(geojsonFilePath));
            }
            else {
                observer.next(data);
                observer.complete();
            }
        });
    });
    // Gestione della risposta con RxJS
    readFile$
        .pipe((0, operators_1.map)(function (data) {
        var geojson = JSON.parse(data);
        res.status(200).json(geojson);
    }))
        .subscribe(function () { }, function (error) {
        logger_1.Logger.writeException(error);
        res.status(500).json({ error: error });
    });
});
