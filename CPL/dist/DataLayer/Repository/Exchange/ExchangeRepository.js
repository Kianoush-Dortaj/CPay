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
const OperationResult_1 = __importDefault(require("../../../core/Operation/OperationResult"));
const Exchange_1 = require("../../Context/Exchange/Exchange");
class ExchangeRepository {
    /****
      *
      * Create Exchange
      *
      ****/
    CreateExchange(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Exchange = yield Exchange_1.ExchangeEntitie.
                    build({
                    name: item.name,
                    isDelete: false,
                    symbol: item.symbol,
                    isPublish: item.isPublish
                });
                yield Exchange.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create Exchange", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set Exchange
      *
      ****/
    UpdateExchange(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Exchange_1.ExchangeEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        name: item.name,
                        symbol: item.symbol,
                        isPublish: item.isPublish
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("Success Update Exchange", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete Exchange
     *
     ****/
    DeleteExchange(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Exchange_1.ExchangeEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete Exchange", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Permission
    *
    ****/
    GetAllExchangeSelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllExchange = yield Exchange_1.ExchangeEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .select("name symbol");
                return OperationResult_1.default.BuildSuccessResult("Get All Exchanges", getAllExchange);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Exchange Paging
    *
    ****/
    GetAllExchangePaging(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = [];
                Object.keys(items.filters).forEach(key => {
                    const value = items.filters[key];
                    if (key === 'name' && value) {
                        query.push({ name: { $regex: `(.*)${value}(.*)` } });
                    }
                    else if (key === 'symbol' && value) {
                        query.push({ symbol: { $regex: `(.*)${value}(.*)` } });
                    }
                });
                let exchnageList = yield Exchange_1.ExchangeEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                let count = yield Exchange_1.ExchangeEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .estimatedDocumentCount();
                return OperationResult_1.default.BuildSuccessResult("Get All data Paging", {
                    data: exchnageList,
                    count: count
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * Get ById Permission
    *
    ****/
    GetByIdExchange(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getAllPermission = [];
                const getExchangeById = yield Exchange_1.ExchangeEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false);
                if (!getExchangeById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Exchange");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Exchanges", {
                    id: getExchangeById._id,
                    name: getExchangeById.name,
                    symbol: getExchangeById.symbol,
                    isPublish: getExchangeById.isPublish
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = ExchangeRepository;
