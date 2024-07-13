import pino from 'pino'
import { LogData, Logger } from '../types'
import { envConfig } from '@config/env'

export const fileTransport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
    },
    {
      target: 'pino/file',
      options: { destination: `${__dirname}/../../../../api.log` },
    },
  ],
})

export const pinoLogger = pino(
  {
    level: envConfig.logLevel,
  },
  fileTransport,
)

const parseLoggerInputToPinoFormat = <T>({
  message,
  error,
  ...data
}: LogData<T>) => ({
  msg: message,
  err: error,
  ...(data?.payload ? data.payload : data),
})

const AppLogger: Logger = {
  debug: <T>(logData: LogData<T>) =>
    pinoLogger.debug(parseLoggerInputToPinoFormat(logData)),
  info: <T>(logData: LogData<T>) =>
    pinoLogger.info(parseLoggerInputToPinoFormat(logData)),
  warn: <T>(logData: LogData<T>) =>
    pinoLogger.warn(parseLoggerInputToPinoFormat(logData)),
  error: <T>(logData: LogData<T>) =>
    pinoLogger.error(parseLoggerInputToPinoFormat(logData)),
}

export default (): Logger => AppLogger
