import {createLogger , transports} from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file' ;
export const logger = createLogger({
  level : 'debug',
  transports : [
    new transports.Console(),
    new DailyRotateFile({
      filename : 'node-crawler-%DATE%.log',
      datePattern : 'YYYY-MM-DD-HH',
      zippedArchive : true,
      maxSize : '20m',
      maxFiles : '14d'
    })
  ]
})