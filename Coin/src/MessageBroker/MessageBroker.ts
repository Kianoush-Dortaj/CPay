import amqp from 'amqplib';
import UnitOfWork from '../DataLayer/Repository/UnitOfWork/UnitOfWork';

export class MessageBroker {

    private static channel: amqp.Channel;
    private static correlationId: any;

    public static async Initial(exchange: string, queue: string) {

        this.correlationId = this.randomid();

        let cluster = await amqp.connect('amqps://mcbzjnsn:0hHb-M1u_XwvuyYch3fM9vJOQUaVBmPQ@cow.rmq2.cloudamqp.com/mcbzjnsn');
        let channel = await cluster.createChannel();

        await channel.assertExchange(exchange, 'direct', { durable: true, autoDelete: true });

        await channel.assertQueue(queue + '.' + exchange, { durable: true, autoDelete: true });

        await channel.bindQueue(queue + '.' + exchange, exchange, queue);

        channel.prefetch(1);



        this.channel = channel;

        await this.Consume(queue, exchange);

    }

    //Random id generator
    private static randomid() {
        return new Date().getTime().toString() + Math.random().toString() + Math.random().toString();
    }

    private static async Consume(exchange: string, queue: string): Promise<void> {

        let correlationId = this.correlationId
        MessageBroker.channel.consume(exchange + '.' + queue, (msg: any) => {

            MessageBroker.channel.consume(queue, function (msg: any) {
                if (msg.properties.correlationId === correlationId) {
                    console.log(' [.] Got %s', msg.content.toString());

                }
            }, {
                noAck: true
            });

            MessageBroker.channel.ack(msg);
        });
        // MessageBroker.channel.consume(exchange + '.' + queue, async (msg: any) => {

        //     const { to, amount, type } = JSON.parse(msg.content);

        //     const transfer = await UnitOfWork.coinRepository.transfer(to, amount);
        //     console.log(to, amount);
        // })

    }




}