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
exports.MessageBroker = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
class MessageBroker {
    static Initial(exchange, queue) {
        return __awaiter(this, void 0, void 0, function* () {
            let cluster = yield amqplib_1.default.connect('amqps://mcbzjnsn:0hHb-M1u_XwvuyYch3fM9vJOQUaVBmPQ@cow.rmq2.cloudamqp.com/mcbzjnsn');
            let channel = yield cluster.createChannel();
            yield channel.assertExchange(exchange, 'direct', { durable: true, autoDelete: true });
            yield channel.assertQueue(queue + '.' + exchange, {
                exclusive: true
            });
            yield channel.bindQueue(queue + '.' + exchange, exchange, queue);
            channel.prefetch(1);
            this.channel = channel;
        });
    }
    //Random id generator
    static randomid() {
        return new Date().getTime().toString() + Math.random().toString() + Math.random().toString();
    }
    static Publish(exchange, queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this.randomid();
            // MessageBroker.channel.sendToQueue(exchange, queue,
            //     Buffer.from(JSON.stringify(message)), { correlationId: id, replyTo: 'amq.rabbitmq.reply-to' })
        });
    }
    static SendToQueue(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = this.randomid();
            MessageBroker.channel.sendToQueue(queue, Buffer.from('10'), {
                correlationId: id,
                replyTo: queue
            });
        });
    }
    static Consume(exchange, queue) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.MessageBroker = MessageBroker;
