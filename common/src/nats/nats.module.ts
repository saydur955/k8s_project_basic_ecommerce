// nats.module.ts
import { Global, Module } from '@nestjs/common';
import { connect, RetentionPolicy, StorageType } from 'nats';
import { NatsService } from './nats.service';
import { nats_subjects } from './nats.types';

@Global()
@Module({
  providers: [
    {
      provide: 'NATS_CONNECTION_SETUP',
      useFactory: async () => {
        const STREAM_NAME = 'NEST_EVENTS_01';
        const NATS_SERVER = process.env.NATS_SERVER || 'nats://localhost:4222';

        const streamConfig = {
          name: STREAM_NAME,
          subjects: [nats_subjects.products, nats_subjects.orders, nats_subjects.users],
          retention: RetentionPolicy.Limits,
          storage: StorageType.File,
        }

        const nc = await connect({
          servers: NATS_SERVER,
          maxReconnectAttempts: 10,
          reconnectTimeWait: 2000,
        });

        // console.log('Connected to NATS');

        const js = nc.jetstream();
        const jsm = await nc.jetstreamManager();

        try {
          const existingStream = await jsm.streams.info(STREAM_NAME);

          // Compare configurations
          if (JSON.stringify(existingStream.config) !== JSON.stringify(streamConfig)) {
            console.log(`Updating existing stream ${STREAM_NAME} with new configuration`);
            await jsm.streams.update(STREAM_NAME, streamConfig);
          } else {
            console.log(`Stream ${STREAM_NAME} already exists with matching configuration`);
          }

          console.log(`Stream '${STREAM_NAME}' already exists`);
        } catch (err: any) {
          if (err?.message.includes('stream not found') || err.code == 404) {
            console.log(`Stream '${STREAM_NAME}' not found, creating it...`);
            await jsm.streams.add(streamConfig);
            console.log(`Created stream '${STREAM_NAME}'`);
          } else {
            console.error('Unexpected error checking stream:', err);
            process.exit(1);
          }
        }

        return { nc, js, jsm };
      },
    },
    NatsService,
  ],
  exports: [NatsService],
})
export class NatsModule { }
