import { ICoinRepository } from "../Coin/ICoinRepository";


export interface IUnitOfWork {

    coinRepository:ICoinRepository;


}