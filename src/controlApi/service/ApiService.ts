import { Injectable } from "@nestjs/common";
import { ScheduleProvider } from "../../crawlerModule/schedule.provider";
import { HSRefiner } from "../../refiner/HSRefiner";
import { KafkaConfiguration } from "../../kafka/kafka.configuration";
import {encode} from 'utf8';

@Injectable()
export class ApiService {

  constructor (private readonly scheduleProvider : ScheduleProvider,
               private readonly refiner : HSRefiner,
               private readonly kafka : KafkaConfiguration) {

  }
  async doCrawl () {
    await this.scheduleProvider.init();

    const schedules = await this.scheduleProvider.collect();

    const refineInfos = this.refiner.refineInfo(schedules);
    const producer = this.kafka.getProducer({});

    await producer.connect();
    const promises = [];
    for(const refined of refineInfos){
      promises.push(producer.send({
        topic : 'crawl-notify-topic.json',
        messages : [
          { value : encode(JSON.stringify(refined))}
        ]
      }));
    }
    await Promise.all(promises).then((result) => {
      console.log(result);
    })
    await producer.disconnect();
  }


}