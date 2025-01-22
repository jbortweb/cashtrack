import { Request, Response, NextFunction } from 'express'
import { param, validationResult } from 'express-validator'
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
  await param('id')
    .isInt()
    .withMessage('El id debe ser un número')
    .custom((value) => value > 0)
    .withMessage('El id debe ser mayor a 0')
    .run(req)

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }
  next()
}

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const budget = await Budget.findByPk(id)
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
