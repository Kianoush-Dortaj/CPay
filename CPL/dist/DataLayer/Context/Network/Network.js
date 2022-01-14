"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NetworkSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    symbol: {
        type: String,
        required: true
    },
    comission: {
        type: Number,
        required: true
    },
    isPublish: { type: Boolean, require: true },
}, {
    toJSON: { virtuals: true },
});
NetworkSchema.statics.build = (attrs) => {
    return new NetworkEntitie(attrs);
};
const NetworkEntitie = mongoose_1.default.model("Network", NetworkSchema);
exports.NetworkEntitie = NetworkEntitie;
