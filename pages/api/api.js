import { sql_query } from "../../lib/db";

const handler = async (req, res) => {
  const { num } = req.query;

  try {
    const results = await sql_query(
      "SELECT * FROM TJD_MAIN WHERE SORTEIO = ? ORDER BY NUMEROSORTEIO",
      num
    );

    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
