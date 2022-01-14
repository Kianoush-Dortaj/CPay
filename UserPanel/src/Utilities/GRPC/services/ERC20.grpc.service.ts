import { credentials, Metadata } from '@grpc/grpc-js';
// import { ERC20Client } from '../models/ERC20_grpc_pb';
// import { EmptyRequest , CreateWalletReposnse } from '../models/ERC20_pb';
import { promisify } from 'util';
import { ERC20Client } from '../Protos/ERC20_grpc_pb';
import { CreateWalletReposnse, EmptyRequest } from '../Protos/ERC20_pb';

class ERC20Service {

    private readonly client: ERC20Client = new ERC20Client('localhost:50051', credentials.createInsecure());

    public async CreateWallet(param: EmptyRequest, metadata: Metadata = new Metadata()): Promise<CreateWalletReposnse> {
        return promisify<EmptyRequest, Metadata, CreateWalletReposnse>(this.client.createWallet.bind(this.client))(param, metadata);
    }

}

export const erc20ClientService: ERC20Service = new ERC20Service();