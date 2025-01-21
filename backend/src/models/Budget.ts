import { Column, DataType, Table, Model } from 'sequelize-typescript'

@Table({
  tableName: 'budgets',
})
class Budget extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string

  @Column({
    type: DataType.DECIMAL,
  })
  declare cantidad: number
}

export default Budget
