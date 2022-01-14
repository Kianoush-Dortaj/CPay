"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class RedisKey {
    constructor() {
        this.UserInfo = 'UserInfo/';
        this.RegisterConfirm = 'RegisterConfirmCode/';
        this.TowfactorKey = 'TowfactorCode/';
        this.UserInforamtion = '/api/UserInformation/';
        this.UserAvatar = 'UserAvatar/';
        this.UserPoster = 'UserPoster/';
        this.TravelRequest = 'TravelRequest/';
        this.RequestByTravelId = 'RequestByTravelId/';
        this.AllTravelRequestbyUserId = 'AllTravelRequestbyUserId/';
        this.AllTravelRequest = 'AllTravelRequest/';
        this.UserAccount = '/api/UserAccount/';
        this.RoleInfo = "/api/RoleManager/";
        this.CurrencyPairList = 'CurrencyPairList';
        this.UserGroup = "UserGroupDefault";
    }
};
