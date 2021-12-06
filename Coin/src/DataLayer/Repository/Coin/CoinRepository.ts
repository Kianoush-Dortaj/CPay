import OperationResult from "../../../core/Operation/OperationResult";
import { ICoinRepository } from "./ICoinRepository";
import CpayCoin from './../../../CoinConfig/coin-config';

export default class CoinRepository implements ICoinRepository {


    async transfer(to: string, amount: number): Promise<OperationResult<any>> {

        try {
            // let transfer = await CpayCoin.coin.methods
            //     .transfer(
            //         to, amount)
            //     .send({ from: '0x2030EE9a8Ea604DFf7D6eeDe06B6224cF9440CC7' });

            return OperationResult.BuildSuccessResult('Success Transfer',true)


        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }

    }






}