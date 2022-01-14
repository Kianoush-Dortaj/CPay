import { credentials, Metadata } from '@grpc/grpc-js';

import { promisify } from 'util';
import { TokenPriceClient } from '../Protos/TokenPrice_grpc_pb';
// import { TokenPriceClient } from '../models/TokenPrice_grpc_pb';
import { Request , Response } from '../Protos/TokenPrice_pb';


class TokenPriceService {

    private readonly client: TokenPriceClient = new TokenPriceClient('localhost:50051', credentials.createInsecure());

    public async GetTokenPrice(param: Request, metadata: Metadata = new Metadata()): Promise<Response> {
        return promisify<Request, Metadata, Response>(this.client.getPriceToken.bind(this.client))(param, metadata);
    }

}

export const erc20ClientService: TokenPriceService = new TokenPriceService();