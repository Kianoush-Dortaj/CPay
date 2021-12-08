import amqp from 'amqplib';

export class MessageBroker {

    private static channel: amqp.Channel;

    public static async Initial(exchange: string, queue: string) {

        let cluster = await amqp.connect('amqps://mcbzjnsn:0hHb-M1u_XwvuyYch3fM9vJOQUaVBmPQ@cow.rmq2.cloudamqp.com/mcbzjnsn');
        let channel = await cluster.createChannel();

        await channel.assertExchange(exchange, 'direct', { durable: true, autoDelete: true });

        await channel.assertQueue(queue + '.' + exchange, {
            exclusive: true
        });

        await channel.bindQueue(queue + '.' + exchange, exchange, queue);

        channel.prefetch(1);

        this.channel = channel;

    }

    //Random id generator
    private static randomid() {
        return new Date().getTime().toString() + Math.random().toString() + Math.random().toString();
    }
    static async Publish(exchange: string, queue: string, message: any): Promise<void> {

        let id = this.randomid();

        MessageBroker.channel.sendToQueue(exchange, queue,
            Buffer.from(JSON.stringify(message)), { correlationId: id, replyTo: 'amq.rabbitmq.reply-to' })

    }

    static async SendToQueue(queue: string, message: any): Promise<void> {

        let id = this.randomid();

        MessageBroker.channel.sendToQueue(queue, Buffer.from('10'), {
            correlationId: id,
            replyTo: queue
        });
    }

    private static async Consume(exchange: string, queue: string): Promise<void> {



    }




}