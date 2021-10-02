const mysql = require("serverless-mysql");

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

export async function sql_query_transaction(query_string, values = []) {
  try {
    const results = await db
      .transaction()
      .query(query_string, values)
      .rollback((e) => {
        throw Error(e.message);
      })
      .commit();

    await db.end();
    return results;
  } catch (e) {
    throw new Error(e);
  }
}

exports.handler = async (event, context) => {
  // Run your query
  let results = await db.query("SELECT * FROM table");

  // Run clean up function
  await db.end();

  // Return the results
  return results;
};
