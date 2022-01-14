"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComissionEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { BaseSchema } from './BaseSchema';
const mongoose_2 = require("mongoose");
const ComissionSchema = new mongoose_1.default.Schema({
    userLevelId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "UserLevel",
        required: true
    },
    actionType: { type: Number, default: false },
    comission: { type: Number, default: false }
}, {
    toJSON: { virtuals: true },
});
ComissionSchema.statics.build = (attrs) => {
    return new ComissionEntitie(attrs);
};
const ComissionEntitie = mongoose_1.default.model("Comission", ComissionSchema);
exports.ComissionEntitie = ComissionEntitie;
