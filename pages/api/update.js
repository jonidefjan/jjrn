import { sql_query } from "../../lib/db";

const updateNum = async (_, res) => {
  try {
    let result = await sql_query
      .transaction()
      .query((numero) => [
        `UPDATE TJD_MAIN SET PAGO=R, NOME=?, TEL=? WHERE NUMEROSORTEIO IN = (?) `,
        numero.nome,
        numero.tel,
        numero.id,
      ])
      .rollback((e) => {
        /* do something with the error */
      }) // optional
      .commit(); // execute the queries
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default updateNum;
