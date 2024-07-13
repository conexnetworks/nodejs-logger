import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRoleUseCase } from './CreateRoleUseCase'
import { logger } from '@shared/http/app'

export class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRoleUseCase = container.resolve(CreateRoleUseCase)
    const { name } = request.body
    const role = await createRoleUseCase.execute({ name })

    logger.info<typeof role>({
      type: 'Info',
      message: 'Role created',
      payload: role,
    })
    return response.status(201).json(role)
  }
}
