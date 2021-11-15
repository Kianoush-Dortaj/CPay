
import { IExchangeRepository } from "../Exchange/IExchangeRepository";
import { IJWTRepository } from "../JWT/IJWTRepository";
import { ILoginRepository } from "../Login/ILoginRepository";
import IUserRepository from "../User/IUserRepository";
import { IUserRoleRepository } from "../UserRole/IUserRoleRepository";

export interface IUnitOfWork {

    userRepository: IUserRepository;
    jwtRepository: IJWTRepository;
    LoginRepository: ILoginRepository;
    UserRoleRepository: IUserRoleRepository;
    ExchangeRepository: IExchangeRepository;

}