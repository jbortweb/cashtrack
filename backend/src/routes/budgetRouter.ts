import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.get('/', BudgetController.getAll)
router.post(
  '/',
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('cantidad')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isNumeric()
    .withMessage('La cantidad debe ser un número')
    .custom((value) => value > 0)
    .withMessage('La cantidad debe ser mayor a 0'),
  handleInputErrors,
  BudgetController.create
)
router.get(
  '/:id',
  param('id')
    .isInt()
    .withMessage('El id debe ser un número')
    .custom((value) => value > 0)
    .withMessage('El id debe ser mayor a 0'),
  handleInputErrors,
  BudgetController.getById
)
router.put(
  '/:id',
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('cantidad')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isNumeric()
    .withMessage('La cantidad debe ser un número')
    .custom((value) => value > 0)
    .withMessage('La cantidad debe ser mayor a 0'),
  param('id')
    .isInt()
    .withMessage('El id debe ser un número')
    .custom((value) => value > 0)
    .withMessage('El id debe ser mayor a 0'),
  handleInputErrors,
  BudgetController.update
)
router.delete(
  '/:id',
  param('id')
    .isInt()
    .withMessage('El id debe ser un número')
    .custom((value) => value > 0)
    .withMessage('El id debe ser mayor a 0'),
  handleInputErrors,
  BudgetController.delete
)

export default router
