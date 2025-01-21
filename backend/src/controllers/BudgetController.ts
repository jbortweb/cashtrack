import { Request, Response } from 'express'

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    console.log('desde get budget')
  }
  static create = async (req: Request, res: Response) => {
    console.log('desde post budget')
  }
  static getById = async (req: Request, res: Response) => {
    console.log('desde getBudgetId budget')
  }
  static update = async (req: Request, res: Response) => {
    console.log('desde update budget')
  }
  static delete = async (req: Request, res: Response) => {
    console.log('desde delete budget')
  }
}
