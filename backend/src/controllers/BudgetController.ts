import { Request, Response } from 'express'
import Budget from '../models/Budget'

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budget = await Budget.findAll({
        order: [['createdAt', 'DESC']],
      })
      res.json(budget)
    } catch (error) {
      res.status(500).json({ error: 'Error al ingresar los datos en la bd' })
    }
  }

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body)
      await budget.save()
      res.status(201).json('Presupuesto creado correctamente')
    } catch (error) {
      res.status(500).json({ error: 'Error al ingresar los datos en la bd' })
    }
  }

  static getById = async (req: Request, res: Response) => {
    res.json(req.budget)
  }

  static update = async (req: Request, res: Response) => {
    await req.budget.update(req.body)
    res.json('Presupuesto actualizado correctamente')
  }

  static delete = async (req: Request, res: Response) => {
    await req.budget.destroy()
    res.json('Presupuesto eliminado correctamente')
  }
}
