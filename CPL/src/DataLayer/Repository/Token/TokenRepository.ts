import OperationResult from "../../../core/Operation/OperationResult";
import { MessageBroker } from "../../../MessageBroker/MessageBroker";
import { MessageBrokerType } from "../../../MessageBroker/MessageBrokerType";
import { ITokenRepository } from "./ITokenRepository";



export default class TokenRepository implements ITokenRepository {


    async transfer(to: string, amount: number): Promise<OperationResult<any>> {

        try {

            await MessageBroker.Publish('coin', 'transaction', {
                type: MessageBrokerType.Transfer,
                to: to,
                amount: amount
            });

            return OperationResult.BuildSuccessResult("Success Transfer", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

}