import Websocket from '../../../Utilities/Websocket/Websocket';
import CoinRepository from '../Coin/CoinRepository';
import { ICoinRepository } from '../Coin/ICoinRepository';
import ComissionRepository from '../Comission/ComissionRepository';
import { IComissionRepository } from '../Comission/IComissionRepository';
import CurrencyPairRepository from '../CurrencyPair/CurrencyPairRepository';
import { ICurrencyPairRepository } from '../CurrencyPair/ICurrencyPairRepository';
import ExchangeRepository from '../Exchange/ExchangeRepository';
import { IExchangeRepository } from '../Exchange/IExchangeRepository';
import GetwayTypeRepository from '../GetwayType/GetwayTypeRepository';
import { IGetwayTypeRepository } from '../GetwayType/IGetwayTypeRepository';
import { IJWTRepository } from '../JWT/IJWTRepository';
import JWTRepository from '../JWT/JWTRepository';
import { ILanguageRepository } from '../Language/ILanguageRepository';
import LanguageRepository from '../Language/LanguageRepository';
import { ILoginRepository } from '../Login/ILoginRepository';
import LoginRepository from '../Login/LoginRepository';
import { INetworkRepository } from '../Network/INetworkRepository';
import NetworkRepository from '../Network/NetworkRepository';
import { INotificationRepository } from '../Notification/INotificationRepository';
import { NotificationRepository } from '../Notification/NotificationRepository';
import { IPermissionRepository } from '../Permission/IPermissionRepository';
import PermissionRepository from '../Permission/PermissionRrepository';
import { IRoleRepository } from '../Role/IRoleRepository';
import RoleRepository from '../Role/RoleRepository';
import { IRolePermissionRepository } from '../RolePermission/IRolePermissionRepository';
import RolePermissionRepository from '../RolePermission/RolePermissionRepository';
import { ISettingRepository } from '../Setting/ISettingRepository';
import SettingRepository from '../Setting/SettingRepository';
import IUserRepository from '../User/IUserRepository';
import { UserRepository } from '../User/UserRepository';
import { IUserActivityRepository } from '../UserActivity/IUserActivityRepository';
import UserActivityRepository from '../UserActivity/UserActivityRepository';
import { IUserLevelRepository } from '../UserLevel/IUserLevelRepository';
import UserLevelRepository from '../UserLevel/UserLevelRepository';
import { IUserRoleRepository } from '../UserRole/IUserRoleRepository';
import UserRoleRepository from '../UserRole/UserRoleRepository';
import { IUnitOfWork } from './IUnitOfWork';

export default new class UnitOfWork implements IUnitOfWork {

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
    ComissionRepository : IComissionRepository;
    NetworkRepository:INetworkRepository;
    LanguageRepository:ILanguageRepository;
    GetwayTypeRepository:IGetwayTypeRepository;
    websocket: Websocket;

    constructor() {

        this.userRepository = new UserRepository();
        this.jwtRepository = new JWTRepository();
        this.LoginRepository = new LoginRepository();
        this.RolePermissionRepository = new RolePermissionRepository();
        this.NotificationRepository = new NotificationRepository();
        this.websocket = new Websocket();
        this.SettingRepository = new SettingRepository();
        this.UserRoleRepository = new UserRoleRepository();
        this.PermissionRepository = new PermissionRepository();
        this.RoleRepository = new RoleRepository();
        this.CoinRepository = new CoinRepository();
        this.CurrencyPairRepository = new CurrencyPairRepository();
        this.ExchangeRepository = new ExchangeRepository();
        this.UserActivityRepositiry = new UserActivityRepository();
        this.UserLevelRepository = new UserLevelRepository();
        this.ComissionRepository = new ComissionRepository();
        this.NetworkRepository = new NetworkRepository();
        this.LanguageRepository = new LanguageRepository();
        this.GetwayTypeRepository = new GetwayTypeRepository();
    }

}