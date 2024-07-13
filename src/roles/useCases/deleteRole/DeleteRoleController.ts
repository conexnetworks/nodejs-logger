import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteRoleUseCase } from './DeleteRoleUseCase'
import { logger } from '@shared/http/app'

export class DeleteRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteRoleUseCase = container.resolve(DeleteRoleUseCase)
    const { id } = request.params
    await deleteRoleUseCase.execute({ id })

    logger.info({
      type: 'Info',
      message: `Role deleted: ${id}`,
    })
    return response.status(204).send()
  }
}
