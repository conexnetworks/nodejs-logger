import pino from 'pino'
import { LogData, Logger } from '../types'

const pinoLogger = pino({
  level: 'debug',
})

const AppLogger: Logger = {
  debug: <T>(logData: LogData<T>) => pinoLogger.debug(logData),
  info: <T>(logData: LogData<T>) => pinoLogger.info(logData),
  warn: <T>(logData: LogData<T>) => pinoLogger.warn(logData),
  error: <T>(logData: LogData<T>) => pinoLogger.error(logData),
}

export default (): Logger => AppLogger
