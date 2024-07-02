import User from '#models/user'
import type { CreateUserSchema, UpdateUserSchema } from '#validators/user_validation'

export default class UserService {
  async store(data: CreateUserSchema) {
    try {
      await User.create(data)
    } catch (error) {
      throw error
    }
  }

  async findUserById(id: number) {
    return User.findBy('id', id)
  }

  async updateUser(user: User, data: UpdateUserSchema) {
    try {
      user.merge(data)
      await user.save()
    } catch (error) {
      throw error
    }
  }

  async deleteUser(user: User) {
    try {
      await user.delete()
    } catch (error) {
      throw error
    }
  }
}
