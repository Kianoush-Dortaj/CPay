import { credentials, Metadata } from '@grpc/grpc-js';
import { EmptyRequest, CreateWalletReposnse, ERC20Client } from "../models/ERC20";
import { promisify } from 'util';

class ERC20Service {

    private readonly client: ERC20Client = new ERC20Client('localhost:50051', credentials.createInsecure());

    public async CreateWallet(param: EmptyRequest, metadata: Metadata = new Metadata()): Promise<CreateWalletReposnse> {
        return promisify<EmptyRequest, Metadata, CreateWalletReposnse>(this.client.createWallet.bind(this.client))(param, metadata);
    }

}

export const erc20ClientService: ERC20Service = new ERC20Service();