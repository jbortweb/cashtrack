import { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      const error = new Error('El email ya está en uso')
      res.status(400).json({ error: error.message })
      return
    }
    try {
      const user = new User(req.body)
      user.password = await hashPassword(password)
      await user.save()
      res.json('Cuenta creada correctamente')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al crear la cuenta' })
    }
  }
}
