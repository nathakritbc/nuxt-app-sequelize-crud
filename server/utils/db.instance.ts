import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./mydb.sqlite",
//   logging: false,
// });

const config = {
  DB_NAME: "jamestat_tato_db",
  DB_USER: "jamestat_tato",
  DB_PASSWORD: "q66_jj7R2",
  DB_HOST: "james-tato.com",
  DB_PORT: 3306,
};


export const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  logging: false,
});
