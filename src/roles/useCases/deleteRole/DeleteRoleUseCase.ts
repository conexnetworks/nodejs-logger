import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { logger } from '@shared/http/app'
import { inject, injectable } from 'tsyringe'

type DeleteRoleParams = {
  id: string
}

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ id }: DeleteRoleParams): Promise<void> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      logger.error({ type: 'Error', message: `Role not found: ${id}` })
      throw new AppError('Role not found', 404)
    }
    await this.rolesRepository.delete(role)
  }
}
