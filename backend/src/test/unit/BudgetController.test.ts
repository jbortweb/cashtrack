import { createRequest, createResponse } from 'node-mocks-http'
import { budgets } from '../mocks/budget'
import { BudgetController } from '../../controllers/BudgetController'
import Budget from '../../models/Budget'

jest.mock('../../models/Budget', () => ({
  findAll: jest.fn(),
}))

describe('BudgetController.getAll', () => {
  it('should retrieve 3 budgets', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 5 },
    })
    const res = createResponse()

    ;(Budget.findAll as jest.Mock).mockResolvedValue(budgets)
    await BudgetController.getAll(req, res)

    const data = res._getJSONData()
    console.log(data)
  })
})
