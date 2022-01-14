"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityEnum = void 0;
var UserActivityEnum;
(function (UserActivityEnum) {
    UserActivityEnum[UserActivityEnum["( Deposit ) Deposit From Other Site"] = 1] = "( Deposit ) Deposit From Other Site";
    UserActivityEnum[UserActivityEnum["( Deposit ) Deposit From Bank Account"] = 2] = "( Deposit ) Deposit From Bank Account";
    UserActivityEnum[UserActivityEnum["( Deposit ) Deposit Cash"] = 2] = "( Deposit ) Deposit Cash";
    UserActivityEnum[UserActivityEnum["( Withdraw ) Send Money To Other Site With Blockchain"] = 3] = "( Withdraw ) Send Money To Other Site With Blockchain";
    UserActivityEnum[UserActivityEnum["( Withdraw ) Withdraw Money To Bank Account"] = 3] = "( Withdraw ) Withdraw Money To Bank Account";
    UserActivityEnum[UserActivityEnum["( Withdraw ) Withdraw Cash Money"] = 3] = "( Withdraw ) Withdraw Cash Money";
    UserActivityEnum[UserActivityEnum["( Internal Transfre ) Send Money To User of Sites"] = 4] = "( Internal Transfre ) Send Money To User of Sites";
    UserActivityEnum[UserActivityEnum["( User ) By Something With Getway"] = 5] = "( User ) By Something With Getway";
    UserActivityEnum[UserActivityEnum["( Seller ) Sell Somting With Getway"] = 6] = "( Seller ) Sell Somting With Getway";
})(UserActivityEnum = exports.UserActivityEnum || (exports.UserActivityEnum = {}));
