import 'dotenv/config'
import 'reflect-metadata'
import { app } from './app'
import { dataSource } from '../typeorm'
import { envConfig } from '@config/env'

dataSource.initialize().then(() => {
  app.listen(envConfig.port, () => {
    console.log(`Server started on port ${envConfig.port}! 🏆`)
  })
})
