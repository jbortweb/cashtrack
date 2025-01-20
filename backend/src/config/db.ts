import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.DATABASE_URL)

export const db = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
})
