"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathsRouter = void 0;
var express_1 = __importDefault(require("express"));
var logger_1 = require("../../../helpers/logger");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
exports.pathsRouter = express_1.default.Router();
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
exports.pathsRouter.get("/:location/:floor", function (req, res) {
    var _a;
    logger_1.Logger.writeEvent("TEST: Hello from  '/:location/:floor' route ");
    var resp$ = (0, rxjs_1.of)("TEST: Hello from  '/:location/:floor' route ");
    var requiredLocation = req.params.location.toLowerCase();
    var requiredFloor = (_a = req.params.floor) !== null && _a !== void 0 ? _a : 0;
    if (requiredLocation !== "salerno" && requiredLocation !== "battipaglia") {
        return res.status(500).json({ error: "Location '".concat(requiredLocation, "' is not served for now") });
    }
    if (+requiredFloor > 4) {
        return res.status(500).json({ error: "Unable to find floor number ".concat(requiredFloor) });
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
        .pipe((0, operators_1.map)(function (data) {
        // const geojson = JSON.parse(data) as FeatureCollection;
        res.status(200).json({ message: data });
    }))
        .subscribe(function () { }, function (error) {
        res.status(500).json({ error: error });
    });
});
