import amqp from 'amqplib';

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

    }

     static async Publish(exchange: string, queue: string , message:any): Promise<void> {

        MessageBroker.channel.publish(exchange, queue, Buffer.from(JSON.stringify(message)))

    }

    private static async Consume(exchange: string, queue: string): Promise<void> {

        MessageBroker.channel.consume(exchange + '.' + queue, (msg: any) => {
            console.log(msg.content.toString())
        })

    }




}