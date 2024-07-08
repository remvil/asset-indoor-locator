"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyPathsRouter = void 0;
var express_1 = __importDefault(require("express"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var logger_1 = require("../../../helpers/logger");
exports.dummyPathsRouter = express_1.default.Router();
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
exports.dummyPathsRouter.get("/:location/:floor", function (req, res) {
    var _a;
    logger_1.Logger.writeEvent("Requested resources from  ".concat(req.originalUrl, " route "));
    var requiredLocation = req.params.location.toLowerCase();
    var requiredFloor = (_a = req.params.floor) !== null && _a !== void 0 ? _a : 0;
    if (requiredLocation !== "salerno" && requiredLocation !== "battipaglia") {
        return res.status(500).json({ error: "Location '".concat(requiredLocation, "' is not served for now") });
    }
    if (+requiredFloor > 4) {
        return res.status(500).json({ error: "Unable to find floor number ".concat(requiredFloor) });
    }
    var geojsonFilePath = !requiredLocation
        ? path_1.default.resolve(__dirname, "../../../../data/geojson/battipaglia/plan4_paths.geojson")
        : path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/plan4_paths.geojson"));
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
