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
exports.RedisManager = void 0;
const redis_1 = __importDefault(require("redis"));
const OperationResult_1 = __importDefault(require("../../core/Operation/OperationResult"));
class RedisManager {
    /*******
     * Set Value on Redis
     *  ******/
    Set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client.set(key, JSON.stringify(value));
                return OperationResult_1.default.BuildSuccessResult('Operation Success', true);
            }
            catch (err) {
                return OperationResult_1.default.BuildFailur(err.message);
            }
        });
    }
    SetValueWithexiperationTime(key, value, time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client.setex(key, time, JSON.stringify(value));
                return OperationResult_1.default.BuildSuccessResult('Operation Success', true);
            }
            catch (err) {
                return OperationResult_1.default.BuildFailur(err.message);
            }
        });
    }
    /*******
     * Get Value in Redis
     *  ******/
    Get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => {
                    this.client.get(key, (err, data) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            reject(OperationResult_1.default.BuildFailur(err.message));
                        resolve(OperationResult_1.default.BuildSuccessResult('Operation Success', JSON.parse(data)));
                    }));
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /*******
       * Remove Value on Redis
       *  ******/
    Remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client.del(key);
                return OperationResult_1.default.BuildSuccessResult('success Operation', true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    ResetSingleItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.del(key);
                yield this.Set(key, value);
                return OperationResult_1.default.BuildSuccessResult('success Operation', true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    Connet() {
        this.client = redis_1.default.createClient({
            host: 'tommy.iran.liara.ir',
            port: 32537,
            password: 'fS01mgQfKgvMkc7oeR8tKZpn'
        });
        // this.subscriber = redis.createClient(32537, "redis://:fS01mgQfKgvMkc7oeR8tKZpn@tommy.iran.liara.ir:32537/0");
        this.client.on("connect", function () {
            console.log("Redis client connected");
        });
        // this.subscriber.on("message", (channel: string, message: any) => {
        //   UnitOfWork.websocket.emit(message);
        // });
        // this.subscriber.subscribe("update-price");
    }
    Subscribe(data) {
        this.client.publish("update-prices-list", JSON.stringify(data));
    }
}
exports.RedisManager = RedisManager;
exports.default = new RedisManager();
