"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
var express_1 = __importDefault(require("express"));
var envconfig_1 = require("../envconfig");
var demoAPI_1 = require("./routes/demoAPI");
var realAPI_1 = require("./routes/realAPI");
exports.apiRouter = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     HospitalAsset:
 *       description: >
 *         A hospital asset is any physical item or resource within a healthcare
 *         facility that supports its operations, enhances patient care, or contributes
 *         to the infrastructure of the hospital. Hospital assets are critical for ensuring
 *         the efficient and effective delivery of healthcare services.
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         tagId:
 *           type: string
 *         batteryLevel:
 *           type: number
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         floor:
 *           type: number
 *     GeoJsonObject:
 *       description: >
 *         GeoJSon object
 *         The coordinate reference system for all GeoJSON coordinates is a
 *         geographic coordinate reference system, using the World Geodetic System
 *         1984 (WGS 84) datum, with longitude and latitude units of decimal
 *         degrees.
 *         This is equivalent to the coordinate reference system identified by the
 *         Open Geospatial Consortium (OGC) URN
 *         An OPTIONAL third-position element SHALL be the height in meters above
 *         or below the WGS 84 reference ellipsoid.
 *         In the absence of elevation values, applications sensitive to height or
 *         depth SHOULD interpret positions as being at local ground or sea level.
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3'
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *           - FeatureCollection
 *           - Feature
 *           - Point
 *           - MultiPoint
 *           - LineString
 *           - MultiLineString
 *           - Polygon
 *           - MultiPolygon
 *           - GeometryCollection
 *         name:
 *           type: string
 *         features:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Feature'
 *       required:
 *       - type
 *       discriminator:
 *         propertyName: type
 *
 *     Geometry:
 *       description: Abstract type for all GeoJSon object except Feature and FeatureCollection
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3'
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *           - Point
 *           - MultiPoint
 *           - LineString
 *           - MultiLineString
 *           - Polygon
 *           - MultiPolygon
 *           - GeometryCollection
 *         coordinates:
 *           type: array
 *           $ref: '#/components/schemas/Position'
 *       required:
 *       - type
 *       discriminator:
 *         propertyName: type
 *
 *     GeometryElement:
 *       description: >
 *         Abstract type for all GeoJSon 'Geometry' object the type of which is not 'GeometryCollection'
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3'
 *       allOf:
 *       - $ref: '#/components/schemas/Geometry'
 *       - type: object
 *         properties:
 *           type:
 *             type: string
 *             enum:
 *             - Point
 *             - MultiPoint
 *             - LineString
 *             - MultiLineString
 *             - Polygon
 *             - MultiPolygon
 *         required:
 *         - type
 *         discriminator:
 *           propertyName: type
 *
 *     FeatureProperty:
 *       description: All the properties of a 'Feature' object
 *       properties:
 *         type:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *
 *     Feature:
 *       description: GeoJSon 'Feature' object
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3.2'
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *             - Feature
 *         properties:
 *           allOf:
 *           - nullable: false
 *           $ref: '#/components/schemas/FeatureProperty'
 *         geometry:
 *           allOf:
 *           - nullable: false
 *           $ref: '#/components/schemas/Geometry'
 *
 *     FeatureCollection:
 *       description: GeoJSon 'FeatureCollection' object
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3.3'
 *       allOf:
 *       - $ref: '#/components/schemas/GeoJsonObject'
 *       - type: object
 *         required:
 *         - features
 *         - name
 *         properties:
 *           name:
 *             type: string
 *           crs:
 *             allOf:
 *             - nullable: true
 *             $ref: '#/components/schemas/CRSObject'
 *           features:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Feature'
 *
 *     CRSObject:
 *       description: >
 *         A CRS object may indicate a coordinate reference system by name. In this case,
 *         the value of its "type" member must be the string "name". The value of its
 *         "properties" member must be an object containing a "name" member. The value of
 *         that "name" member must be a string identifying a coordinate reference system.
 *         OGC CRS URNs such as "urn\:ogc:def:crs:OGC:1.3:CRS84" shall be preferred over
 *         legacy identifiers such as "EPSG:4326"::
 *       externalDocs:
 *         url: 'https://datatracker.ietf.org/doc/html/rfc7946#section-4'
 *       properties:
 *         type:
 *           type: string
 *         properties:
 *           type: string
 *
 *     Position:
 *       description: >
 *         GeoJSon fundamental geometry construct.
 *         A position is an array of numbers. There MUST be two or more elements.
 *         The first two elements are longitude and latitude, or easting and
 *         northing, precisely in that order and using decimal numbers.
 *         Altitude or elevation MAY be included as an optional third element.
 *         Implementations SHOULD NOT extend positions beyond three elements
 *         because the semantics of extra elements are unspecified and ambiguous.
 *         Historically, some implementations have used a fourth element to carry
 *         a linear referencing measure (sometimes denoted as "M") or a numerical
 *         timestamp, but in most situations a parser will not be able to properly
 *         interpret these values. The interpretation and meaning of additional
 *         elements is beyond the scope of this specification, and additional
 *         elements MAY be ignored by parsers.
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3.1.1'
 *       type: array
 *       minItems: 2
 *       maxItems: 3
 *       items:
 *         type: number
 *
 *     LineStringCoordinates:
 *       description: >
 *         GeoJSon fundamental geometry construct, array of two or more positions.
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3.1.4'
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Position'
 *       minItems: 2
 *
 *     LinearRing:
 *       description: >
 *         A linear ring is a closed LineString with four or more positions.
 *         The first and last positions are equivalent, and they MUST contain
 *         identical values; their representation SHOULD also be identical.
 *         A linear ring is the boundary of a surface or the boundary of a hole in
 *         a surface.
 *         A linear ring MUST follow the right-hand rule with respect to the area
 *         it bounds, i.e., exterior rings are counterclockwise, and holes are
 *         clockwise.
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3.1.6'
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Position'
 *       minItems: 4
 *
 *     Point:
 *       description: GeoJSon geometry
 *       externalDocs:
 *         url: 'https://tools.ietf.org/html/rfc7946#section-3.1.2'
 *       allOf:
 *         - $ref: '#/components/schemas/GeometryElement'
 *         - type: object
 *           required:
 *           - type
 *           - coordinates
 *           properties:
 *             type:
 *               type: 'string'
 *               enum: [Point]
 *             coordinates:
 *               $ref: '#/components/schemas/Position'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     HealthcheckResponse:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            example: Hey this is a example of the status
 * /api/healthcheck:
 *  get:
 *    summary: Returns a message regarding the health status of the server
 *    description: Returns a json message about the server status and listening port
 *    responses:
 *      '200':
 *        description: I'm alive and listening on port XXXX
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HealthcheckResponse'
 *      '404':
 *        description:  Not Found
 *    tags:
 *      - Healthcheck
 *
 * @swagger
 * 	components:
 *   schema:
 *    $ref: '#/components/schemas/GenericError'
 *
 */
exports.apiRouter.get("/healthcheck", function (_req, res) { return res.json({ message: "Hey I'm still alive and listening on port ".concat(envconfig_1.HOST_SERVER_PORT) }); });
if (envconfig_1.ENVIRONMENT === "demo") {
    // Dummy data API
    exports.apiRouter.use("/assets", demoAPI_1.demoAPIRoutes.dummyAssetsRouter);
    exports.apiRouter.use("/map", demoAPI_1.demoAPIRoutes.dummyMapRouter);
    exports.apiRouter.use("/path", demoAPI_1.demoAPIRoutes.dummyPathsRouter);
}
else {
    // BlueIOT data API
    exports.apiRouter.use("/assets", realAPI_1.realAPIRoutes.assetsRouter);
    exports.apiRouter.use("/map", realAPI_1.realAPIRoutes.mapRouter);
    exports.apiRouter.use("/path", realAPI_1.realAPIRoutes.pathsRouter);
}
