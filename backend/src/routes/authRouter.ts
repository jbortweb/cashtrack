import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { limiter } from '../config/limiter'

const router = Router()

router.post(
  '/create-account',
  body('name').notEmpty().withMessage('Nombre es obligatorio'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('email').isEmail().withMessage('Email no válido'),
  handleInputErrors,
  AuthController.createAccount
)

router.post(
  '/confirm-account',
  limiter,
  body('token')
    .notEmpty()
    .withMessage('Token es obligatorio')
    .isLength({ min: 6, max: 6 })
    .withMessage('Token debe tener 6 caracteres'),
  handleInputErrors,
  AuthController.confirmeAccount
)

router.post(
  '/login',
  body('email').isEmail().withMessage('Email no válido'),
  body('password').notEmpty().withMessage('La contraseña no debe ir vacía'),
  handleInputErrors,
  AuthController.login
)

export default router
