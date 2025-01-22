import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import {
  validateBudgetInput,
  validateBudgetById,
  validateBudgetExists,
} from '../middleware/budget'

const router = Router()

router.param('budgetId', validateBudgetById)
router.param('budgetId', validateBudgetExists)

router.get('/', BudgetController.getAll)

router.post(
  '/',
  validateBudgetInput,
  handleInputErrors,
  BudgetController.create
)
router.get('/:budgetId', BudgetController.getById)

router.put(
  '/:budgetId',
  validateBudgetInput,
  handleInputErrors,
  BudgetController.update
)

router.delete('/:budgetId', BudgetController.delete)

export default router
