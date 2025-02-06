import { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {
  /* CREAR CUENTA */
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
      user.token = generateToken()
      await user.save()
      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      })
      res.json('Cuenta creada correctamente')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al crear la cuenta' })
    }
  }

  /* CONFIRMAR CUENTA */
  static confirmeAccount = async (req: Request, res: Response) => {
    const { token } = req.body

    const tokenExists = await User.findOne({ where: { token } })
    if (!tokenExists) {
      const error = new Error('Token inválido')
      res.status(401).json({ error: error.message })
      return
    }

    try {
      tokenExists.confirmed = true
      tokenExists.token = ''
      await tokenExists.save()
      res.json('Cuenta confirmada correctamente')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al confirmar la cuenta' })
    }
  }
}
