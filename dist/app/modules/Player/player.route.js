"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const player_controller_1 = require("./player.controller");
const player_validation_1 = require("./player.validation");
const router = express_1.default.Router();
router.get('/:id', player_controller_1.PlayerControllers.getSinglePlayer);
router.patch('/:id', 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(player_validation_1.PlayerValidations.updatePlayerSchema), player_controller_1.PlayerControllers.updatePlayer);
router.delete('/:id', 
// auth(USER_ROLE.admin),
player_controller_1.PlayerControllers.deletePlayer);
router.post('/create-turf', (0, validateRequest_1.default)(player_validation_1.PlayerValidations.createPlayerSchema), player_controller_1.PlayerControllers.createPlayer);
router.get('/', player_controller_1.PlayerControllers.getAllPlayer);
exports.PlayerRoutes = router;
