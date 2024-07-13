import { Role } from '@roles/entities/Role'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { logger } from '@shared/http/app'
import { inject, injectable } from 'tsyringe'

type CreateRoleDTO = {
  name: string
}

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ name }: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExists = await this.rolesRepository.findByName(name)
    if (roleAlreadyExists) {
      logger.error({ type: 'Error', message: 'Role already exists' })
      throw new AppError('Role already exists')
    }
    const role = await this.rolesRepository.create({ name })
    logger.info<typeof role>({
      type: 'Info',
      message: 'Role created',
      payload: role,
    })
    return role
  }
}
