"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetsRouter = void 0;
var express_1 = __importDefault(require("express"));
var logger_1 = require("../../../helpers/logger");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var assetsRouter = express_1.default.Router();
exports.assetsRouter = assetsRouter;
assetsRouter.get("/:location?", function (req, res) {
    logger_1.Logger.writeEvent("TEST: Hello from  '/assets//:location?' route ");
    var resp$ = (0, rxjs_1.of)("TEST: Hello from  '/assets//:location?' route ");
    // Gestione della risposta con RxJS
    resp$
        .pipe((0, operators_1.map)(function (data) {
        res.status(200).json({ message: data });
    }))
        .subscribe(function () { }, function (error) {
        res.status(404).json(error);
    });
});
