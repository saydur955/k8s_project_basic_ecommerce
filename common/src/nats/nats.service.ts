import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { connect, RetentionPolicy, StorageType, JetStreamClient, JetStreamManager, DeliverPolicy, AckPolicy, JsMsg, NatsConnection } from 'nats';
import { StringCodec } from 'nats';
import { nats_subject, nats_subjects, NatsEventMap } from './nats.types';


export const STREAM_NAME = 'NEST_EVENTS_01';

@Injectable()
export class NatsService implements OnModuleDestroy {

  public readonly nc: NatsConnection;
  public readonly js: JetStreamClient;
  public readonly jsm: JetStreamManager;
  public readonly sc = StringCodec();

  constructor(
    // Inject from the factory return value
    @Inject('NATS_CONNECTION_SETUP')
    private readonly connection: {
      nc: NatsConnection;
      js: JetStreamClient;
      jsm: JetStreamManager;
    },
  ) {
    this.nc = connection.nc;
    this.js = connection.js;
    this.jsm = connection.jsm;
  }

  public async createConsumer(durableName: string, filterSubject: nats_subjects) {
    try {
      await this.jsm.consumers.add(STREAM_NAME, {
        durable_name: durableName,
        filter_subject: filterSubject,
        deliver_policy: DeliverPolicy.All,
        ack_policy: AckPolicy.Explicit,
        ack_wait: 30_000, // 30s to acknowledge
      });
      console.log(`Created consumer: ${durableName}`);
    } catch (err: any) {
      if (err.message.includes('consumer already exists')) {
        console.log(`Consumer ${durableName} already exists, continuing...`);
      } else {
        console.error(`Failed to create consumer ${durableName}`, err);
        throw err;
      }
    }
  }

  public async publish<K extends keyof NatsEventMap>(subject: K, payload: NatsEventMap[K]) {
    await this.js.publish(subject, this.sc.encode(JSON.stringify(payload)));
  }

  public async consumeMessages<K extends keyof NatsEventMap>(
    durableName: string,
    handler: (subject: K, data: NatsEventMap[K], msg?: JsMsg) => Promise<void>
  ) {
    const consumer = await this.js.consumers.get(STREAM_NAME, durableName);
    const messages = await consumer.consume();

    (async () => {
      for await (const msg of messages) {
        try {

          const subject = msg.subject as K;
          const decoded = JSON.parse(this.sc.decode(msg.data)) as NatsEventMap[K];

          await handler(subject, decoded, msg);
          msg.ack();
        } catch (err) {

          msg.nak(30_000); // 30s delay

          // console.error(`Error processing message in ${durableName}:`, err);
          // msg.term();
        }
      }
    })();
  }

  async onModuleDestroy() {
    if (this.nc) {
      await this.nc.drain();
    }
  }
}