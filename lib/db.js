

import mysql from 'serverless-mysql'

export const db = mysql({
  config: {
    host: 'jjrn.app.br',
    database: 'jjrnap02_DUZZI',
    user: 'jjrnap02_admin',
    password: 'Def@55243862',
  },
})

export async function sql_query(query_string,values = []) {
  try {
    const results = await db.query(query_string, values)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

/*SELECT * FROM `TJD_MAIN` WHERE ID´

MYSQL_HOST = jjrn.app.br
MYSQL_DATABASE = jjrnap02_DUZZI
MYSQL_USER =  jjrnap02_admin
MYSQL_PASSWORD = Def@55243862*/