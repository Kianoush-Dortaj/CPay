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
const BaseController_1 = require("../../core/Controller/BaseController");
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
exports.default = new class NetworkController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create Network ****/
    CreateNetwork(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { name, symbol, comission, isPublish } = req.body;
            if (!validationData.haveError) {
                const createNetwork = yield UnitOfWork_1.default.NetworkRepository.CreateNetwork({
                    name,
                    symbol,
                    comission,
                    isPublish
                });
                if (createNetwork.success) {
                    return this.Ok(res, "Success Create Network");
                }
                return this.BadRerquest(res, createNetwork.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateNetwork ****/
    UpdateNetwork(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const NetworkId = req.params.id;
                const { name, symbol, comission, isPublish } = req.body;
                const updateNetwork = yield UnitOfWork_1.default.NetworkRepository.UpdateNetwork({
                    id: NetworkId,
                    name,
                    symbol,
                    comission,
                    isPublish
                });
                if (updateNetwork.success) {
                    return this.Ok(res, "Update Network");
                }
                return this.BadRerquest(res, updateNetwork.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete Network ****/
    DeleteNetwork(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteNetwork = yield UnitOfWork_1.default.NetworkRepository.DeleteNetwork(req.params.id);
                if (deleteNetwork.success) {
                    return this.Ok(res, "Success Delete Network");
                }
                return this.BadRerquest(res, deleteNetwork.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Network Paging ****/
    GetAllNetworkPaging(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllNetworkPagingNetwork = yield UnitOfWork_1.default.NetworkRepository
                    .GetAllNetworkPaging(req.body);
                if (getAllNetworkPagingNetwork.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllNetworkPagingNetwork.result ? (_a = getAllNetworkPagingNetwork.result) === null || _a === void 0 ? void 0 : _a.count : 0,
                        data: (_b = getAllNetworkPagingNetwork.result) === null || _b === void 0 ? void 0 : _b.data
                    }, "Get All Network Paging");
                }
                return this.BadRerquest(res, getAllNetworkPagingNetwork.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Network Select ****/
    GetAllNetworkSelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllNetworkSelectNetwork = yield UnitOfWork_1.default.NetworkRepository
                    .GetAllNetworkSelect();
                if (getAllNetworkSelectNetwork.success) {
                    return this.OkObjectResult(res, {
                        data: getAllNetworkSelectNetwork.result
                    }, "Get All Network Paging");
                }
                return this.BadRerquest(res, getAllNetworkSelectNetwork.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById Network ****/
    GetByIdNetwork(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const NetworkId = req.params.id;
                const getNetworkbyId = yield UnitOfWork_1.default.NetworkRepository
                    .GetByIdNetwork(NetworkId);
                if (getNetworkbyId.success) {
                    return this.OkObjectResult(res, {
                        data: getNetworkbyId.result
                    }, "Get Network By Id");
                }
                return this.BadRerquest(res, getNetworkbyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
