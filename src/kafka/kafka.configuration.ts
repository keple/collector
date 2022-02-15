import {Kafka, logLevel, Producer} from 'kafkajs';
import {Injectable} from "@nestjs/common";


@Injectable()
export class KafkaConfiguration {
  private kafkaConfig: Kafka;

  constructor(){
    this.kafkaConfig = new Kafka({
      logLevel: logLevel.DEBUG,
      clientId : 'crawler',
      brokers : ['localhost:9092']
    });

    this.createTopic().then((result) => {
      console.log(result);
    });
  }
  //create topic
  async createTopic(): Promise<boolean>{
    const admin = this.kafkaConfig.admin();
    return admin.createTopics({
      topics : [{
        topic : 'crawl-notify-topic.json',
        numPartitions : 2
      }] ,
    })
  }
  getProducer(config : any) : Producer {
    return this.kafkaConfig.producer(config);
  }
  getConsumer (groupId : string) {
    return this.kafkaConfig.consumer({groupId : groupId});
  }
}
