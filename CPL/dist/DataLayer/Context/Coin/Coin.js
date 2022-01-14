"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinEntitie = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CoinSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    symbol: {
        type: String,
        required: true
    },
    isPublish: { type: Boolean, require: true },
    icon: {
        type: String,
        required: true
    },
    networks: [
        {
            networkId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Network',
            },
            contractAddress: {
                type: String,
                require: false
            },
            contractAbi: {
                type: String,
                require: false
            }
        }
    ],
    locals: [{
            lang: { type: String },
            value: {
                name: { type: String },
                langId: { type: mongoose_1.Schema.Types.ObjectId }
            }
        }]
}, {
    toJSON: { virtuals: true },
});
CoinSchema.statics.build = (attrs) => {
    return new CoinEntitie(attrs);
};
const CoinEntitie = mongoose_1.default.model("Coin", CoinSchema);
exports.CoinEntitie = CoinEntitie;
