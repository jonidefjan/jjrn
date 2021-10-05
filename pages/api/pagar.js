import { sql_query } from "../../lib/db";

const handler = async (req, res) => {
  const { nome } = req.query;

  try {
    const results = await sql_query(
      "SELECT * FROM TJD_MAIN WHERE NOME = ? ORDER BY NUMEROSORTEIO",
      nome
    );

    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
