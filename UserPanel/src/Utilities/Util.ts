import UnitOfWork from "../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { GetAllUserActivityModel } from "../DTO/UserActivity/GetAllUserActivityModel";

export default new class UtilService {


    getDirectoryImage(dir: string) {
        return dir.substring(10);
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    convertEnumToArray(value: any): GetAllUserActivityModel[] {

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

    async getAcceptLang(req: any): Promise<string> {

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

}