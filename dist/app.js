"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// application routes
app.use('/api', routes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Turf Hub API Documentation',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
            },
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./src/app/modules/API-documentation/swagger.ts'],
})));
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(' <div style=" height:100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; "><h1 style="border: 1px solid red; border-radius: 10px; padding: 10px; color: red;">Ki amake dekhe hotash naki? ami tomader restful api.</h1> <img src="https://media.tenor.com/sMTKcbAPZ8cAAAAj/sonic-run-away.gif" alt="gif" /> <small style="color: green;">Server Running...</small> </div> ');
});
app.get('/', test);
app.use(globalErrorhandler_1.default);
//Not Found
app.use(notFound_1.default);
exports.default = app;
