import { sql_query } from "../../lib/db";

const handler = async (_, res) => {
  try {
    const results = await sql_query(`
            SELECT * FROM TJD_MAIN 
            ORDER BY NUMEROSORTEIO
            LIMIT 100
        `);
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
