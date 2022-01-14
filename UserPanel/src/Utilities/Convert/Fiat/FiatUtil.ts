import OperationResult from "../../../core/Operation/OperationResult";
import https from 'http';
import { GetCurrencyReponse } from "./models/GetCurrencyResponse";
import axios, { AxiosResponse } from "axios";

export class FiatUtil {


    static baseUrl = 'http://data.fixer.io/api/latest?access_key=055efbe13495143cfcb450c5e03c898f&format=1';


    static async CalcuateCurrencyPairs(from: string, to: string, amount: number): Promise<OperationResult<number>> {

        let model: GetCurrencyReponse = {
            success: false,
            timestamp: 0,
            base: "",
            date: "",
            rates: undefined
        };

        let result: AxiosResponse = await axios.get(this.baseUrl);

        if (result.data.success) {
            model = result.data;

            const calcAmount = await this.CalculateAmount(model, from, to, amount);

            if (calcAmount.success && calcAmount.result) {
                return OperationResult.BuildSuccessResult("", calcAmount.result);
            }

            return OperationResult.BuildFailur(calcAmount.message)
        }
       return OperationResult.BuildFailur("we can not get currency price please try again later");
    }


    private static async CalculateAmount(rates: GetCurrencyReponse, from: string, to: string, amount: number): Promise<OperationResult<number>> {

        return new Promise((resolve, reject) => {
            try {
                let calcAmount;
                console.log(from,to)
                if (rates.base == from) {
                    console.log(rates.rates[to])
                    calcAmount = amount * rates.rates[to];
                    resolve(OperationResult.BuildSuccessResult("", calcAmount));
                } else if (rates.base == to) {
                    console.log(rates.rates[from])
                    calcAmount = amount / rates.rates[from];

                    resolve(OperationResult.BuildSuccessResult("", calcAmount));
                } else {
                    reject(OperationResult.BuildFailur("Problem with Calcualte Your Money Price . Please Try again"))
                }
            } catch (error: any) {
                reject(OperationResult.BuildFailur("We can not Convert these cirrency . please try again"))

            }

        });

    }



}