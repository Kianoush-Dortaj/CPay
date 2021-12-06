

import CoinRepository from '../Coin/CoinRepository';
import { ICoinRepository } from '../Coin/ICoinRepository';
import { IUnitOfWork } from './IUnitOfWork';

export default new class UnitOfWork implements IUnitOfWork {

    coinRepository:ICoinRepository;

    constructor() {

        this.coinRepository = new CoinRepository();

    }

}