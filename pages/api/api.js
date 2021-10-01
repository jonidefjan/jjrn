import { sql_query } from "../../lib/db";

const handler = async (_, res) => {
  try {
    const results = await sql_query(`
            SELECT * FROM TJD_MAIN WHERE SORTEIO = '001' ORDER BY NUMEROSORTEIO
        `);

    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
