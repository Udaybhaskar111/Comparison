import { Sequelize } from "sequelize";
export const oracle = async (req, res) => {
  const sequelize = new Sequelize("orcl", "SYSTEM", "1234", {
    host: "localhost",
    port: "1521",
    dialect: "oracle",
  });

  sequelize.authenticate().then(() => {
    console.log("connected oracle");
    sequelize
      .query("SELECT * from TABLE1", { type: sequelize.QueryTypes.SELECT })
      .then((results) => {
        console.log(results, "as resuly");
        res.json({ results: results });
      })
      .catch((error) => {
        console.error("Error executing query:", error);
      });
  });
};
