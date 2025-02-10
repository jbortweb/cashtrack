import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from '../../mocks/budget'
import { validateBudgetExists, hasAccess } from '../../../middleware/budget'
import Budget from '../../../models/Budget'

jest.mock('../../../models/Budget', () => ({
  findByPk: jest.fn(),
}))

describe('validateBudgetExists', () => {
  it('should handle non-existence budget', async () => {
    ;(Budget.findByPk as jest.Mock).mockResolvedValue(null)
    const req = createRequest({
      params: { budgetId: 1 },
    })
    const res = createResponse()

    const next = jest.fn()

    await validateBudgetExists(req, res, next)

    expect(res.statusCode).toBe(404)
    const data = res._getJSONData()
    expect(data).toEqual({ error: 'Presupuesto no encontrado' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should proceed to next middlewre if budget exist', async () => {
    ;(Budget.findByPk as jest.Mock).mockResolvedValue(budgets[0])
    const req = createRequest({
      params: { budgetId: 1 },
    })
    const res = createResponse()

    const next = jest.fn()

    await validateBudgetExists(req, res, next)

    expect(res.statusCode).toBe(200)
    expect(req.budget).toEqual(budgets[0])
    expect(next).toHaveBeenCalled()
  })

  it('should handle error existence budget', async () => {
    ;(Budget.findByPk as jest.Mock).mockRejectedValue(new Error())
    const req = createRequest({
      params: { budgetId: 1 },
    })
    const res = createResponse()

    const next = jest.fn()

    await validateBudgetExists(req, res, next)

    expect(res.statusCode).toBe(500)
    const data = res._getJSONData()
    expect(data).toEqual({ error: 'Hubo un error con la id' })
    expect(next).not.toHaveBeenCalled()
  })
})

describe('hasAccess', () => {
  it(' should return 401 if userId does not have access to budget ', () => {
    const req = createRequest({
      user: { id: 1 },
      budget: { userId: 2 },
    })
    const res = createResponse()

    const next = jest.fn()

    hasAccess(req, res, next)

    expect(res.statusCode).toBe(401)
    const data = res._getJSONData()
    expect(data).toEqual({
      error: 'No tienes permiso para acceder a este recurso',
    })
    expect(next).not.toHaveBeenCalled()
  })
  it(' should call next if user has access ', () => {
    const req = createRequest({
      user: { id: 1 },
      budget: { userId: 1 },
    })
    const res = createResponse()

    const next = jest.fn()

    hasAccess(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(next).toHaveBeenCalledTimes(1)
  })
})
