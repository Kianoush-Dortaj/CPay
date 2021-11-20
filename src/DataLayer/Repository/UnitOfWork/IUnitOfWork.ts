
import Websocket from "../../../Utilities/Websocket/Websocket";
import { ICoinRepository } from "../Coin/ICoinRepository";
import { ICurrencyPairRepository } from "../CurrencyPair/ICurrencyPairRepository";
import { IExchangeRepository } from "../Exchange/IExchangeRepository";
import { IJWTRepository } from "../JWT/IJWTRepository";
import { ILoginRepository } from "../Login/ILoginRepository";
import { INotificationRepository } from "../Notification/INotificationRepository";
import { IPermissionRepository } from "../Permission/IPermissionRepository";
import { IRoleRepository } from "../Role/IRoleRepository";
import { IRolePermissionRepository } from "../RolePermission/IRolePermissionRepository";
import { ISettingRepository } from "../Setting/ISettingRepository";
import IUserRepository from "../User/IUserRepository";
import { IUserActivityRepository } from "../UserActivity/IUserActivityRepository";
import { IUserLevelRepository } from "../UserLevel/IUserLevelRepository";
import { IUserRoleRepository } from "../UserRole/IUserRoleRepository";

export interface IUnitOfWork {

    userRepository: IUserRepository;
    jwtRepository: IJWTRepository;
    LoginRepository: ILoginRepository;
    NotificationRepository: INotificationRepository;
    RolePermissionRepository: IRolePermissionRepository;
    PermissionRepository: IPermissionRepository;
    RoleRepository: IRoleRepository;
    ExchangeRepository: IExchangeRepository;
    UserRoleRepository: IUserRoleRepository;
    SettingRepository: ISettingRepository;
    CoinRepository: ICoinRepository;
    CurrencyPairRepository: ICurrencyPairRepository;
    UserActivityRepositiry: IUserActivityRepository;
    UserLevelRepository: IUserLevelRepository;
    websocket: Websocket;

}