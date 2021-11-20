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

}