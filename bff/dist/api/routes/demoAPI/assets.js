"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyAssetsRouter = void 0;
var express_1 = __importDefault(require("express"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var logger_1 = require("../../../helpers/logger");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var _ = require("lodash");
function handleMissedLocationError(requiredLocation, res) {
    if (!requiredLocation || (requiredLocation !== "salerno" && requiredLocation !== "battipaglia")) {
        return res.status(400).json({ error: "Map Error: You need to specify right location parameter" });
    }
}
exports.dummyAssetsRouter = express_1.default.Router();
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
exports.dummyAssetsRouter.get("/list/:location", function (req, res) {
    logger_1.Logger.writeEvent("Requested resources from  ".concat(req.originalUrl, " route "));
    var requiredLocation = req.params.location.toLowerCase();
    handleMissedLocationError(requiredLocation, res);
    var geoJSONAssetsList = path_1.default.resolve(__dirname, "../../../../data/geojson/".concat(requiredLocation, "/assets.geojson"));
    var assets$ = new rxjs_1.Observable(function (observer) {
        fs_1.default.readFile(geoJSONAssetsList, "utf8", function (err, data) {
            if (err) {
                observer.error({ error: "Assets not Found" });
            }
            var dataObj = JSON.parse(data);
            var featuresArray = dataObj.features;
            var assetsFiltered = featuresArray.map(function (feature) {
                return _.pick(feature.properties, ["id", "name", "description", "batteryLevel", "tagId", "floor", "lon", "lat"]);
            });
            observer.next(assetsFiltered);
            observer.complete();
        });
    });
    // Gestione della risposta con RxJS
    assets$
        .pipe((0, operators_1.map)(function (assets) {
        res.status(200).json(assets);
    }))
        .subscribe(function () { }, function (error) {
        logger_1.Logger.writeException(error);
        res.status(404).json(error);
    });
});
