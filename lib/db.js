import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export async function sql_query(query_string, values = []) {
  try {
    const results = await db.query(query_string, values);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

/*SELECT * FROM `TJD_MAIN` WHERE ID´

MYSQL_HOST = jjrn.app.br
MYSQL_DATABASE = jjrnap02_DUZZI
MYSQL_USER =  jjrnap02_admin
MYSQL_PASSWORD = Def@55243862*/
