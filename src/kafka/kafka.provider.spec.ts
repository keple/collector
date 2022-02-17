import { Test, TestingModule } from '@nestjs/testing';
import { KafkaConfiguration } from "./kafka.configuration";

describe('Kafka Configuration test', () => {
  let kafkaConfiguration: KafkaConfiguration;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [KafkaConfiguration],
    }).compile();

    kafkaConfiguration = app.get<KafkaConfiguration>(KafkaConfiguration);
  });

  describe('client test', () => {
    it('create topic', () => {
      expect(kafkaConfiguration.createTopic()).toBeInstanceOf(Promise);
    });

  });
});