import User from '#models/user'
import UserService from '#services/user_service'
import { createUserValidation, updateUserValidation } from '#validators/user_validation'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index({ view }: HttpContext) {
    const users = await User.all()
    return view.render('pages/users/index', { users })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  async store({ request, response }: HttpContext) {
    const user = await request.validateUsing(createUserValidation)
    await this.userService.store(user)
    return response.redirect().toRoute('users.index')
  }

  async edit({ view, request }: HttpContext) {
    const user = await User.findBy('id', request.param('id'))
    return view.render('pages/users/edit', { user })
  }

  async update({ request, response }: HttpContext) {
    const user = await this.userService.findUserById(request.param('id'))

    if (!user) {
      return response.badRequest('User not found')
    }

    const data = await request.validateUsing(updateUserValidation)
    await this.userService.updateUser(user, data)
    return response.redirect().toRoute('users.index')
  }

  async destroy({ request, response }: HttpContext) {
    const user = await this.userService.findUserById(request.param('id'))

    if (!user) {
      return response.badRequest('User not found')
    }

    await this.userService.deleteUser(user)
    return response.redirect().toRoute('users.index')
  }
}
