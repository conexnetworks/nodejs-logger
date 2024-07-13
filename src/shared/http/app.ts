import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { errors } from 'celebrate'
import { routes } from './routes'
import { AppError } from '@shared/errors/AppError'
import swaggerFile from '../../swagger.json'
import '@shared/container'
import uploadConfig from '@config/upload'
import { makeLogger } from '../logger/pino/index'

export const logger = makeLogger()

// logger.info({
//   type: 'debug',
//   message: 'Ola Dev',
// })

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)
app.use(errors())
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      logger.error({ type: 'Error', error })
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }
    console.log(error)
    logger.error({ type: 'Error', error: error as unknown as AppError })
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

export { app }
