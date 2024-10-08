"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facilities = void 0;
const mongoose_1 = require("mongoose");
const FacilitiesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
exports.Facilities = (0, mongoose_1.model)('Facilities', FacilitiesSchema);
