import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import Budget from './Budget'

@Table({
  tableName: 'expenses',
})
class Expense extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @Column({
    type: DataType.DECIMAL,
  })
  declare cantidad: number

  @ForeignKey(() => Budget)
  declare budgetId: number

  @BelongsTo(() => Budget)
  declare budget: Budget
}

export default Expense
