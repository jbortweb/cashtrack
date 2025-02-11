import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Budget from '../models/Budget'

declare global {
  namespace Express {
    interface Request {
      budget?: Budget
    }
  }
}

export const validateBudgetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param('budgetId')
    .isInt()
    .withMessage('El id debe ser un número')
    .custom((value) => value > 0)
    .withMessage('El id debe ser mayor a 0')
    .run(req)
  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { budgetId } = req.params
    const budget = await Budget.findByPk(budgetId)
    if (!budget) {
      const error = new Error('Presupuesto no encontrado')
      res.status(404).json({ error: error.message })
      return
    }
    req.budget = budget
    next()
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error con la id' })
  }
}

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body('name').notEmpty().withMessage('El nombre es requerido').run(req)
  await body('cantidad')
    .notEmpty()
    .withMessage('La cantidad es requerida')
    .isNumeric()
    .withMessage('La cantidad debe ser un número')
    .custom((value) => value > 0)
    .withMessage('La cantidad debe ser mayor a 0')
    .run(req)
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  next()
}

export function hasAccess(req: Request, res: Response, next: NextFunction) {
  if (req.user.id !== req.budget.userId) {
    res
      .status(401)
      .json({ error: 'No tienes permiso para acceder a este recurso' })
    return
  }
  next()
}
