import amqp from 'amqplib';
import UnitOfWork from '../DataLayer/Repository/UnitOfWork/UnitOfWork';

export class MessageBroker {

    private static channel: amqp.Channel;

    public static async Initial(exchange: string, queue: string) {

        let cluster = await amqp.connect('amqps://mcbzjnsn:0hHb-M1u_XwvuyYch3fM9vJOQUaVBmPQ@cow.rmq2.cloudamqp.com/mcbzjnsn');
        let channel = await cluster.createChannel();

        await channel.assertExchange(exchange, 'direct', { durable: true, autoDelete: true });

        await channel.assertQueue(queue + '.' + exchange, { durable: true, autoDelete: true });

        await channel.bindQueue(queue + '.' + exchange, exchange, queue);

        channel.prefetch(1);

        this.channel = channel;

        await this.Consume(queue, exchange);

    }

    private static async Consume(exchange: string, queue: string): Promise<void> {


        MessageBroker.channel.consume(exchange + '.' + queue, async (msg: any) => {

            const { to, amount , type } = JSON.parse(msg.content);

            const transfer = await UnitOfWork.coinRepository.transfer(to, amount);
            console.log(to, amount);
        })

    }




}