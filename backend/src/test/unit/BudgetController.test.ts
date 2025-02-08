import { budgets } from '../mocks/budget'

describe('BudgetController.getAll', () => {
  it('should retrieve 3 budgets', () => {
    expect(budgets.length).toBe(3)
  })
})
