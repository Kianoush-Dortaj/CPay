
import 'source-map-support/register';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { ERC20Service } from '../models/ERC20';
import { ERC20GrpcService } from '../services/ERC20.grpc.service';

export class GRPCConfig {


    static inital(): void {

        const server = new Server({
            'grpc.max_receive_message_length': -1,
            'grpc.max_send_message_length': -1,
        });

        server.addService(ERC20Service, new ERC20GrpcService());

        server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), (err: Error | null) => {
            if (err) {
                throw err;
            }
            server.start();
            console.log('GRPC Server start');
        })
    }

}
