import { Column, DataType, Table, Model } from 'sequelize-typescript'

@Table({
  tableName: 'budgets',
})
class Budget extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  name: string

  @Column({
    type: DataType.DECIMAL,
  })
  cantidad: number
}

export default Budget
