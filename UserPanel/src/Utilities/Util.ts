import UnitOfWork from "../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { GetAllUserActivityModel } from "../DTO/UserActivity/GetAllUserActivityModel";
import uniqueString from 'unique-string';
import redisRepository from './Redis/RedisRepository';
import OperationResult from "../core/Operation/OperationResult";
import { GenerateHashcodeResult } from "../DTO/utilitie/GetrateHashcodeResult";
import RedisRepository from "./Redis/RedisRepository";


export default class UtilService {


    static getDirectoryImage(dir: string) {
        return dir.substring(10);
    }

    static async getRandomInt(min: number, max: number): Promise<number> {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static convertEnumToArray(value: any): GetAllUserActivityModel[] {

        const map: GetAllUserActivityModel[] = [];

        for (let key in value) {
            //TypeScript does not allow enum keys to be numeric
            if (!isNaN(Number(key))) continue;

            const val = value[key] as string | number;

            //TypeScript does not allow enum value to be null or undefined
            if (val !== undefined && val !== null)
                map.push({
                    key: val,
                    value: key
                });
        }

        return map;
    }

    static async getAcceptLang(req: any): Promise<string> {

        let lang = null;

        if (req.headers['accept-language']) {
            lang = req.headers['accept-language'];
        } else {

            const defaultItem = await UnitOfWork.LanguageRepository.
                GetDefulatLanguage();

            if (defaultItem.success) {

                lang = defaultItem.success ?
                    defaultItem.result ?
                        defaultItem.result?.uniqueSeoCode : 'en' : 'en';
            } else {
                lang = null;
            }
        }
        return lang;
    }

    static async GerateHashCode(redisKey: any): Promise<OperationResult<GenerateHashcodeResult>> {
        try {

            let hash = uniqueString();
            let code = await this.getRandomInt(1111111, 999999);

            const setValue = await redisRepository.SetValueWithexiperationTime(redisKey, {
                code: code,
                hash: hash
            }, 120)

            if (setValue.success) {
                return OperationResult.BuildSuccessResult("Success", {
                    code: code,
                    hash: hash
                })
            }
            return OperationResult.BuildFailur(setValue.message);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

    static async CheckHashCode(redisKey: any, code: string, hash: string): Promise<OperationResult<boolean>> {

        try {

            let findKeyInRedis = await RedisRepository.Get<any>(redisKey);

            const resultredis = JSON.parse(findKeyInRedis.result);

            if (!findKeyInRedis.success) {

                return OperationResult.BuildFailur(findKeyInRedis.message);
            } else if (resultredis.code != code || resultredis.hash != hash) {

                return OperationResult.BuildFailur('Your code is Expire . please Type again');
            }

            return OperationResult.BuildSuccessResult(findKeyInRedis.message, true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }



    }

}