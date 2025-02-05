import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'

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

export default router
