import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body, header, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { limiter } from '../config/limiter'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(limiter)

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
  body('token')
    .notEmpty()
    .withMessage('Token es obligatorio')
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no válido'),
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

router.post(
  '/forgot-password',
  body('email').isEmail().withMessage('Email no válido'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post(
  '/validate-token',
  body('token')
    .notEmpty()
    .withMessage('Token es obligatorio')
    .isLength({ min: 6, max: 6 })
    .withMessage('Token no válido'),
  handleInputErrors,
  AuthController.validateToken
)

router.post(
  '/reset-password/:token',
  param('token')
    .notEmpty()
    .withMessage('Token es obligatorio')
    .isLength({ min: 6, max: 6 })
    .withMessage('Token debe tener 6 caracteres'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  handleInputErrors,
  AuthController.resetPasswordToken
)

router.get('/user', authenticate, AuthController.user)

router.post(
  '/update-password',
  authenticate,
  body('current_password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  handleInputErrors,
  AuthController.updatePassword
)

router.post(
  '/check-password',
  authenticate,
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  AuthController.checkUserPassword
)

export default router
