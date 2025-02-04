import { Router } from 'express'
import { BudgetController } from '../controllers/BudgetController'
import { handleInputErrors } from '../middleware/validation'
import {
  validateBudgetInput,
  validateBudgetById,
  validateBudgetExists,
} from '../middleware/budget'
import { ExpenseController } from '../controllers/ExpenseControlle'
import {
  validateExpenseExists,
  validateExpensetById,
  validateExtenseInput,
} from '../middleware/expense'

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

/* Routes for expenses */

router.post(
  '/:budgetId/expenses',
  validateExtenseInput,
  handleInputErrors,
  ExpenseController.create
)
router.get(
  '/:budgetId/expenses/:expenseId',
  validateExpensetById,
  validateExpenseExists,
  ExpenseController.getById
)
router.put('/:budgetId/expenses/:expenseId', ExpenseController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpenseController.deleteById)

export default router
