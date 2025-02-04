import { NextFunction, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import Expense from '../models/Expense'

declare global {
  namespace Express {
    interface Request {
      expense?: Expense
    }
  }
}

export const validateExtenseInput = async (
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

export const validateExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { expenseId } = req.params
    const expense = await Expense.findByPk(expenseId)
    if (!expense) {
      const error = new Error('Gasto no encontrado')
      res.status(404).json({ error: error.message })
      return
    }
    req.expense = expense
    next()
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error con la id' })
  }
}
export const validateExpensetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param('expenseId')
    .isInt()
    .custom((value) => value > 0)
    .withMessage('ID no válido')
    .run(req)

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
