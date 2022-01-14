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
const CurrencyPair_1 = require("../../Context/CurrencyPair/CurrencyPair");
const UnitOfWork_1 = __importDefault(require("../UnitOfWork/UnitOfWork"));
const listen_chanel_1 = require("../../../Utilities/Websocket/Pattern/listen-chanel");
const listen_type_1 = require("../../../Utilities/Websocket/Pattern/listen-type");
class CurrencyPairRepository {
    /****
      *
      * Create CurrencyPair
      *
      ****/
    CreateCurrencyPair(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CurrencyPair = yield CurrencyPair_1.CurrencyPairEntitie.
                    build({
                    coinId: item.coinId,
                    exchangeId: item.exchangeId,
                    isPublish: item.isPublish,
                    pairs: [...item.pairs]
                });
                yield CurrencyPair.save();
                new listen_chanel_1.Listen(listen_type_1.ListenType.UpdateCurrencyPairs).listen({
                    data: '',
                    userId: ''
                });
                return OperationResult_1.default.BuildSuccessResult("Success Create CurrencyPair", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set CurrencyPair
      *
      ****/
    UpdateCurrencyPair(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CurrencyPair_1.CurrencyPairEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        coinId: item.coinId,
                        exchangeId: item.exchangeId,
                        isPublish: item.isPublish,
                        pairs: [...item.pairs]
                    }
                });
                new listen_chanel_1.Listen(listen_type_1.ListenType.UpdateCurrencyPairs).listen({
                    data: '',
                    userId: ''
                });
                return OperationResult_1.default.BuildSuccessResult("Success Update CurrencyPair", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete CurrencyPair
     *
     ****/
    DeleteCurrencyPair(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CurrencyPair_1.CurrencyPairEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                new listen_chanel_1.Listen(listen_type_1.ListenType.UpdateCurrencyPairs).listen({
                    data: '',
                    userId: ''
                });
                return OperationResult_1.default.BuildSuccessResult("Success Delete CurrencyPair", true);
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
    GetAllCurrencyPairSelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllCurrencyPair = yield CurrencyPair_1.CurrencyPairEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .where("isPublish")
                    .equals(true);
                return OperationResult_1.default.BuildSuccessResult("Get All CurrencyPairs", getAllCurrencyPair);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll CurrencyPair Paging
    *
    ****/
    GetAllCurrencyPairPaging(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = [];
                Object.keys(items.filters).forEach(key => {
                    const value = items.filters[key];
                    query.push({ [key]: value });
                });
                let exchnageList = yield CurrencyPair_1.CurrencyPairEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                let count = yield CurrencyPair_1.CurrencyPairEntitie.find({})
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
    GetByIdCurrencyPair(id, lang) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let coinsSelectModel = [];
                const getCurrencyPairById = yield CurrencyPair_1.CurrencyPairEntitie
                    .findById({ _id: id })
                    .where("isPublish")
                    .equals(true);
                if (!getCurrencyPairById) {
                    return OperationResult_1.default.BuildFailur("Can not find this CurrencyPair");
                }
                const coinsSelect = yield UnitOfWork_1.default.CoinRepository.
                    GetAllCoinSelect(lang);
                (_a = coinsSelect.result) === null || _a === void 0 ? void 0 : _a.forEach((data) => {
                    let selected = false;
                    getCurrencyPairById.pairs.forEach((element) => {
                        if (data.id.toString() === element.toString()) {
                            selected = true;
                        }
                    });
                    coinsSelectModel.push({
                        id: data.id,
                        isSelected: selected,
                        symbol: data.symbol,
                        name: data.name
                    });
                });
                return OperationResult_1.default.BuildSuccessResult("Get All CurrencyPairs", {
                    id: getCurrencyPairById._id,
                    coinId: getCurrencyPairById.coinId,
                    exchangeId: getCurrencyPairById.exchangeId,
                    isPublish: getCurrencyPairById.isPublish,
                    pairs: coinsSelectModel
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * Get Currency Pairs
    *
    ****/
    GetAllCurrencyPairs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pairs = [];
                const currencyPairs = yield CurrencyPair_1.CurrencyPairEntitie
                    .find({})
                    .populate("coinId")
                    .populate("exchangeId")
                    .populate("pairs");
                currencyPairs.forEach(element => {
                    if (element.isPublish === true && element.coinId.isPublish) {
                        element.pairs.forEach((data) => {
                            if (data.isPublish && data.isDelete === false) {
                                const pairName = element.coinId.symbol + '/' + data.symbol;
                                pairs.push({
                                    exchange: 'BINANCE',
                                    fromName: element.coinId.name,
                                    symbol: pairName,
                                    toName: data.name
                                });
                            }
                        });
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("", pairs);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = CurrencyPairRepository;
