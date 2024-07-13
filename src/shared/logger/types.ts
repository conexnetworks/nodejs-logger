import { AppError } from '@shared/errors/AppError'

export type LogData<T> = {
  type: string
  payload?: T
  message?: string
  error?: AppError
} & (
  | {
      message: string
    }
  | {
      error: AppError
    }
)

export type LogMethod = <T>(logdata: LogData<T>) => void

export type Logger = {
  debug: LogMethod
  info: LogMethod
  warn: LogMethod
  error: LogMethod
}
