
import UnitOfWork from "../../../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { IObserver } from "./IObserver";
import RedisRepository from "../../../Redis/RedisRepository";
import RedisKey from "../../../Redis/RedisKey";
import RedisManager from './../../../../Utilities/Redis/RedisRepository';

export class CurrencyPairClient implements IObserver {

    public async update(info: any): Promise<void> {


        const currencyPairLists = await UnitOfWork.CurrencyPairRepository
            .GetAllCurrencyPairs();

        if (currencyPairLists) {

            const setRedisValue = await RedisRepository.Set
                (RedisKey.CurrencyPairList, currencyPairLists);

            if (!setRedisValue.success) {
                return;
            }
            console.log(currencyPairLists.result);
            RedisManager.Subscribe(currencyPairLists.result)
        }


    }

}