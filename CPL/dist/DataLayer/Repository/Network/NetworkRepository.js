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
const Network_1 = require("../../Context/Network/Network");
class NetworkRepository {
    /****
      *
      * Create Network
      *
      ****/
    CreateNetwork(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Network = yield Network_1.NetworkEntitie.
                    build({
                    name: item.name,
                    isDelete: false,
                    comission: item.comission,
                    symbol: item.symbol,
                    isPublish: item.isPublish
                });
                yield Network.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create Network", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set Network
      *
      ****/
    UpdateNetwork(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Network_1.NetworkEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        name: item.name,
                        symbol: item.symbol,
                        comission: item.comission,
                        isPublish: item.isPublish
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("Success Update Network", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete Network
     *
     ****/
    DeleteNetwork(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Network_1.NetworkEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete Network", true);
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
    GetAllNetworkSelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllNetwork = yield Network_1.NetworkEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .where("isPublish")
                    .equals(true)
                    .select("name symbol comission");
                return OperationResult_1.default.BuildSuccessResult("Get All Networks", getAllNetwork);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Network Paging
    *
    ****/
    GetAllNetworkPaging(items) {
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
                let exchnageList = yield Network_1.NetworkEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                let count = yield Network_1.NetworkEntitie.find({})
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
    * Get ById
    *
    ****/
    GetByIdNetwork(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getNetworkById = yield Network_1.NetworkEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false);
                console.log(id);
                if (!getNetworkById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Network");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Networks", {
                    id: getNetworkById._id,
                    name: getNetworkById.name,
                    comission: getNetworkById.comission,
                    symbol: getNetworkById.symbol,
                    isPublish: getNetworkById.isPublish
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = NetworkRepository;
