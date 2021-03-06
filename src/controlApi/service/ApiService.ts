import { Injectable } from "@nestjs/common";
import { ScheduleProvider } from "../../crawlerModule/schedule.provider";
import { HSRefiner } from "../../refiner/HSRefiner";
import { KafkaConfiguration } from "../../kafka/kafka.configuration";
import {encode} from 'utf8';
import {logger} from "../../../winston.config";
import { ProductProvider } from "../../crawlerModule/product.provider";
import { ProductRefiner } from "../../refiner/ProductRefiner";
@Injectable()
export class ApiService {

  constructor (private readonly scheduleProvider : ScheduleProvider,
               private readonly productProvider : ProductProvider,
               private readonly refiner : HSRefiner,
               private readonly productRefiner : ProductRefiner,
               private readonly kafka : KafkaConfiguration) {

  }
  async collectSchedule () {
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
      logger.debug(result)
    })
    await producer.disconnect();
  }
  async collectProduct () {
    const products = await this.productProvider.collect();
    const productRefined = this.productRefiner.refineInfo(products);
    const producer = this.kafka.getProducer({});
    await producer.connect();
    const promises = [];
    for (const refined of productRefined){
      promises.push(producer.send({
        topic : 'product-notify-topic.json',
        messages : [
          {value : encode(JSON.stringify(refined))}
        ]
      }));
    }
    await Promise.all(promises).then((result) => {
      logger.debug(result);
    })
  }


}