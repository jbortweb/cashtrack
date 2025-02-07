import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'
import { generateJWT } from '../utils/jwt'

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

  //LOGIN
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    //Revisar si el usuario existe
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(404).json({ error: 'Usuario  no encontrado' })
      return
    }
    //Revisar si el usaurio está confirmado
    if (!user.confirmed) {
      res.status(403).json({ error: 'Usuario no confirmado, revisa tu correo' })
      return
    }

    //Revisar password

    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
      const error = new Error('Contraseña incorrecta')
      res.status(401).json({ error: error.message })
      return
    }

    //Generar token

    const token = generateJWT(user.id)

    res.json(token)
  }

  //RECUPERAR CONTRASEÑA

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(404).json({ error: 'Usuario  no encontrado' })
      return
    }
    const token = generateToken()
    user.token = token
    await user.save()

    await AuthEmail.resetPasswordEmail({
      name: user.name,
      email: user.email,
      token: user.token,
    })
    res.json('Revisa tu correo')
  }

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body

    const tokenExists = await User.findOne({ where: { token } })
    if (!tokenExists) {
      const error = new Error('Token inválido')
      res.status(404).json({ error: error.message })
      return
    }
    res.json('Token válido')
  }

  //ACTUALIZAR CONTRASEÑA

  static resetPasswordToken = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ where: { token } })
    if (!user) {
      const error = new Error('Token inválido')
      res.status(404).json({ error: error.message })
      return
    }
    //asignar nuevo password
    user.password = await hashPassword(password)
    user.token = null

    await user.save()

    res.json('El password se ha actualizado correctamente')
  }

  static user = async (req: Request, res: Response) => {
    res.json(req.user)
  }
  static updatePassword = async (req: Request, res: Response) => {
    res.json('Desde usupdatePassword')
  }
}
