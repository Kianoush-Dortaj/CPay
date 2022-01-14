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
const Coin_1 = require("../../Context/Coin/Coin");
const Util_1 = __importDefault(require("./../../../Utilities/Util"));
const listen_chanel_1 = require("../../../Utilities/Websocket/Pattern/listen-chanel");
const listen_type_1 = require("../../../Utilities/Websocket/Pattern/listen-type");
const UnitOfWork_1 = __importDefault(require("../UnitOfWork/UnitOfWork"));
class CoinRepository {
    /****
      *
      * Create Coin
      *
      ****/
    CreateCoin(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let avatarUrl = Util_1.default.getDirectoryImage(`${item.icon.destination}/${item.icon.originalname}`);
                const checkValidNetwork = yield this.checkExsistNetwork(item.networks);
                if (!checkValidNetwork.success) {
                    return OperationResult_1.default.BuildFailur(checkValidNetwork.message);
                }
                const Coin = yield Coin_1.CoinEntitie.
                    build({
                    name: item.name,
                    isDelete: false,
                    symbol: item.symbol,
                    isPublish: item.isPublish,
                    icon: avatarUrl,
                    networks: [...item.networks],
                    locals: [...item.locals]
                });
                yield Coin.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create Coin", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    checkExsistNetwork(networks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hasError = false;
                const mapLoop = () => __awaiter(this, void 0, void 0, function* () {
                    const get = networks.map((res) => __awaiter(this, void 0, void 0, function* () {
                        const data = yield UnitOfWork_1.default.NetworkRepository.GetByIdNetwork(res.networkId);
                        if (!data.success) {
                            hasError = true;
                        }
                    }));
                    const network = yield Promise.all(get);
                });
                yield mapLoop();
                if (hasError) {
                    return OperationResult_1.default.BuildFailur("we can not fidn the newtork");
                }
                return OperationResult_1.default.BuildSuccessResult("web can not find network selected", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set Coin
      *
      ****/
    UpdateCoin(item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let avatarUrl;
                const checkValidNetwork = yield this.checkExsistNetwork(item.networks);
                if (!checkValidNetwork.success) {
                    return OperationResult_1.default.BuildFailur(checkValidNetwork.message);
                }
                if (item.icon) {
                    avatarUrl = Util_1.default.getDirectoryImage(`${item.icon.destination}/${item.icon.originalname}`);
                }
                else {
                    const coinItem = yield this.GetByIdCoin(item.id);
                    avatarUrl = (_a = coinItem.result) === null || _a === void 0 ? void 0 : _a.icon;
                }
                yield Coin_1.CoinEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        name: item.name,
                        symbol: item.symbol,
                        icon: avatarUrl,
                        networks: [...item.networks],
                        isPublish: item.isPublish,
                        locals: [...item.locals]
                    }
                });
                // new Listen(ListenType.UpdateCurrencyPairs).listen({
                //     data: '',
                //     userId: ''
                // });
                return OperationResult_1.default.BuildSuccessResult("Success Update Coin", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete Coin
     *
     ****/
    DeleteCoin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Coin_1.CoinEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                new listen_chanel_1.Listen(listen_type_1.ListenType.UpdateCurrencyPairs).listen({
                    data: '',
                    userId: ''
                });
                return OperationResult_1.default.BuildSuccessResult("Success Delete Coin", true);
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
    GetAllCoinSelect(lang) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSelectedCoin = [];
                const getAllCoin = yield Coin_1.CoinEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .where("isPublish")
                    .equals(true)
                    .select("name symbol icon locals");
                getAllCoin.forEach(data => {
                    var _a, _b;
                    const name = (_a = data.locals.find(x => x.lang === lang)) === null || _a === void 0 ? void 0 : _a.value.name;
                    getSelectedCoin.push({
                        id: data.id,
                        icon: data.icon,
                        symbol: data.symbol,
                        name: name ?
                            (_b = data.locals.find(x => x.lang === lang)) === null || _b === void 0 ? void 0 : _b.value.name :
                            data.name
                    });
                });
                return OperationResult_1.default.BuildSuccessResult("Get All Select Coin Coins", getSelectedCoin);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Coin Paging
    *
    ****/
    GetAllCoinPaging(items) {
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
                let exchnageList = yield Coin_1.CoinEntitie.find(...query)
                    .skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                let count = yield Coin_1.CoinEntitie.find({})
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
    GetByIdCoin(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let networkSelectModel = [];
                const getCoinById = yield Coin_1.CoinEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false);
                if (!getCoinById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Coin");
                }
                const networkSelectSelect = yield UnitOfWork_1.default.NetworkRepository.
                    GetAllNetworkSelect();
                (_a = networkSelectSelect.result) === null || _a === void 0 ? void 0 : _a.forEach((data, index) => {
                    let selected = false;
                    getCoinById.networks.forEach((element) => {
                        if (data.id.toString() === element.toString()) {
                            selected = true;
                        }
                    });
                    networkSelectModel.push({
                        id: data.id,
                        isSelected: selected,
                        name: data.name,
                        contractAbi: getCoinById.networks[index]['contractAbi'],
                        contractAddress: getCoinById.networks[index]['contractAddress']
                    });
                });
                return OperationResult_1.default.BuildSuccessResult("Get All Coins", {
                    id: getCoinById._id,
                    name: getCoinById.name,
                    symbol: getCoinById.symbol,
                    isPublish: getCoinById.isPublish,
                    icon: getCoinById.icon,
                    networks: networkSelectModel,
                    locals: getCoinById.locals
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * Get ById For Update
    *
    ****/
    GetByIdCoinForUpdate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let networkSelectModel = [];
                const getCoinById = yield Coin_1.CoinEntitie.findById({ _id: id });
                if (!getCoinById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Coin");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Coins", {
                    id: getCoinById._id,
                    name: getCoinById.name,
                    symbol: getCoinById.symbol,
                    isPublish: getCoinById.isPublish,
                    icon: getCoinById.icon,
                    networks: getCoinById.networks,
                    locals: getCoinById.locals
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = CoinRepository;
