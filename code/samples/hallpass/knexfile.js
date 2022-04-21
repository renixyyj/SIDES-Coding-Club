/**
* HallPass Knex Config
*
* Copyright © 2021 Finer Engineering Inc. All rights reserved.
*
*/


const c = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'hallpass',
  schema: "public",
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  application_name: 'HallPass'
}

const t = {
  client: 'pg',
  migrations: {
    directory: './src/db/migrations'
  },
  seeds: {
    directory: './src/db/seeds'
  },
  useNullAsDefault: true
}

const config = {
  development: {
    ...t,
    connection: {
      ...c
    }
  },
  production: {
    ...t,
    connection: {
      ...c
    }
  },
  dev: {
    ...t,
    connection: {
      ...c,
      user: process.env.DB_ADMIN,
      password: process.env.DB_ADMIN_PASS
    }
  },
  prod: {
    ...t,
    connection: {
      ...c,
      user: process.env.DB_ADMIN,
      host: process.env.DB_PROD_HOST,
      //database: 'appstream',
      password: process.env.DB_PROD_ADMIN_PASS,
      port: process.env.DB_PROD_PORT
    }
  }
};

export default config;