import pino from 'pino'
import { LogData, Logger } from '../types'
import { envConfig } from '@config/env'

export const pinoTransport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
    },
    {
      target: '@logtail/pino',
      options: { sourceToken: 'gsDp9BVES2Wg5ePhDNsJrs4o' },
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
    redact: {
      paths: ['user.name', 'user.email', 'user.password'],
      remove: true,
    },
  },
  pinoTransport,
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
