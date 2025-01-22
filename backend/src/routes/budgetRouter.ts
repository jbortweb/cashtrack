import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { validateBudgetById, validateBudgetExists } from '../middleware/budget'

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
  validateBudgetById,
  validateBudgetExists,
  BudgetController.getById
)

router.put(
  '/:id',
  validateBudgetById,
  validateBudgetExists,
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('cantidad')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isNumeric()
    .withMessage('La cantidad debe ser un número')
    .custom((value) => value > 0)
    .withMessage('La cantidad debe ser mayor a 0'),
  BudgetController.update
)

router.delete(
  '/:id',
  validateBudgetById,
  validateBudgetExists,
  BudgetController.delete
)

export default router
