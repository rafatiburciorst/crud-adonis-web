import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createUserValidation = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine
      .string()
      .email()
      .trim()
      .normalizeEmail()
      .unique(async (db, value, _field) => {
        const result = await db.from('users').select('id').where('email', value)
        return result.length ? false : true
      }),
    password: vine.string().trim().minLength(6),
    cpf: vine.string().trim(),
  })
)

export const updateUserValidation = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    password: vine.string().trim().minLength(6).optional(),
    cpf: vine.string().trim().optional(),
  })
)

export type CreateUserSchema = Infer<typeof createUserValidation>
export type UpdateUserSchema = Infer<typeof updateUserValidation>
