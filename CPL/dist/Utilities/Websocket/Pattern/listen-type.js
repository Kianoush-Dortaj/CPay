"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenType = void 0;
var ListenType;
(function (ListenType) {
    ListenType[ListenType["Initial"] = 1] = "Initial";
    ListenType[ListenType["ChangeRequestStatus"] = 2] = "ChangeRequestStatus";
    ListenType[ListenType["Request"] = 3] = "Request";
    ListenType[ListenType["Notification"] = 4] = "Notification";
    ListenType[ListenType["ReciveMessage"] = 5] = "ReciveMessage";
    ListenType[ListenType["IsTyping"] = 6] = "IsTyping";
    ListenType[ListenType["ReadAllDirectMessage"] = 7] = "ReadAllDirectMessage";
    ListenType[ListenType["UpdateCurrencyPairs"] = 8] = "UpdateCurrencyPairs";
})(ListenType = exports.ListenType || (exports.ListenType = {}));
