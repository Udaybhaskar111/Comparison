import { Sequelize } from "sequelize";
export const sqlite = async (req, res) => {
  const sequelize = new Sequelize("", "", "", {
    dialect: "sqlite",
    storage: "C:/Users/Uday/Desktop/sqliteDb.db",
  });
  sequelize.authenticate().then(() => {
    console.log("connected sqlite");
    sequelize
      .query("SELECT * from user_info;", { type: sequelize.QueryTypes.SELECT })
      .then((results) => {
        console.log(results, "as resuly");
        res.json({ results: results });
      })
      .catch((error) => {
        console.error("Error executing query:", error);
      });
  });
};
