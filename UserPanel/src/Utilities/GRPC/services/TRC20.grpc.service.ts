import { credentials, Metadata } from '@grpc/grpc-js';
import { EmptyRequest, CreateWalletReposnse, TRC20Client } from "../models/TRC20";
import { promisify } from 'util';

class TRC20Service {

    private readonly client: TRC20Client = new TRC20Client('localhost:50052', credentials.createInsecure());

    public async CreateWallet(param: EmptyRequest, metadata: Metadata = new Metadata()): Promise<CreateWalletReposnse> {
        return promisify<EmptyRequest, Metadata, CreateWalletReposnse>(this.client.createWallet.bind(this.client))(param, metadata);
    }

}

export const trc20ClientService: TRC20Service = new TRC20Service();