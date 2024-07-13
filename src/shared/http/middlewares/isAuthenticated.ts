import { NextFunction, Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import { logger } from '../app'

type JwtPayloadProps = {
  sub: string
}

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    const error = {
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    }
    logger.error<typeof error>({
      type: 'Error',
      message: 'Access token not present',
      payload: error,
    })
    return response.status(401).json(error)
  }
  const token = authHeader.replace('Bearer ', '')
  if (!token) {
    const error = {
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    }
    logger.error<typeof error>({
      type: 'Error',
      message: 'Access token not present',
      payload: error,
    })
    return response.status(401).json(error)
  }
  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret)
    const { sub } = decodedToken as JwtPayloadProps
    request.user = { id: sub }
    return next()
  } catch {
    const error = {
      error: true,
      code: 'token.expired',
      message: 'Access token not present',
    }
    logger.error<typeof error>({
      type: 'Error',
      message: 'Access token not present',
      payload: error,
    })
    return response.status(401).json(error)
  }
}
