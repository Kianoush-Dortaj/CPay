
import jwt from "jsonwebtoken";
import OperationResult from "../../../core/Operation/OperationResult";
import { IJWTRepository } from "./IJWTRepository";


export default class JWTRepository implements IJWTRepository {

    /********
     * Generate Token
     *******/

    async GenerateToken(info: any): Promise<OperationResult<string>> {
        try {

            var payload = {
                iss: "a57bb14a44455e98800d6a513953fc0",
                sub: "a57bb14a445541e98800d6a513953fc0",
                aud: "Store.com",
                expiresIn: 360,
                iat: 360,
            };

            let token = jwt.sign({ info: info, payload }, "travelbudy", { expiresIn: 60 * 24 });
            return OperationResult.BuildSuccessResult('', token);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /********
     * Generate Token
     *******/

    async GenerateTokenWithExTime(info: any , time:number): Promise<OperationResult<string>> {
        try {

            var payload = {
                iss: "a57bb14a44455e98800d6a513953fc0",
                sub: "a57bb14a445541e98800d6a513953fc0",
                aud: "Store.com",
                expiresIn: time,
                iat: 360,
            };

            let token = jwt.sign({ info: info, payload }, "travelbudy", { expiresIn: 60 * 24 });
            return OperationResult.BuildSuccessResult('', token);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /********
  * Decode Token
  *******/

    async DecodeToken(req: any, res: any, next: any): Promise<OperationResult<any>> {
        try {

            let token = await this.GetToken(req);
            if (token) {
                let tokenInfo: any = await jwt.verify(token, "travelbudy");

                if (tokenInfo) {
                    return OperationResult.BuildSuccessResult('success decode', tokenInfo.info.id)
                }
            }
            return OperationResult.BuildFailur('Error Decode')

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }


    async DecodeWebsocketToken(token?: string): Promise<OperationResult<any>> {
        try {
            if (token) {
                let tokenInfo: any = await jwt.verify(token, "travelbudy");
                if (tokenInfo) {
                    return OperationResult.BuildSuccessResult('success decode', tokenInfo.info.userId)
                }
            }

            return OperationResult.BuildFailur('Error Decode')

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }


    async GetToken(req: any): Promise<string | null> {
        const token = req.headers["authorization"];
        if (
            token &&
            token.toLowerCase().startsWith("bearer ")
        ) {
            return token.substring(7);
        }
        return null;
    }


}