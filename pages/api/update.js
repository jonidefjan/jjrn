import { sql_query_transaction } from "../../lib/db";

const updateNum = async (req, res) => {
  const { numero } = JSON.parse(req.body);

  try {
    await sql_query_transaction(
      'UPDATE TJD_MAIN SET PAGO="R", NOME=?, TEL=? WHERE NUMEROSORTEIO IN (?)',
      [numero.nome, numero.tel, numero.id]
    );

    res
      .status(200)
      .json({ message: `Pagamento do número ${numero.id} reservado` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default updateNum;
