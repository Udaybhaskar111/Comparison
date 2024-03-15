import * as fs from "fs";
import { Sequelize } from "sequelize";
export const connection =async(req,res)=>{
      const {body}=req;
      const {TabelName,DBtype,passwd,user_id,DBname}=body;
      const sequelize = new Sequelize(DBname, user_id, passwd
    , {
      host: 'localhost',
      dialect: DBtype,
    });
     sequelize.authenticate().then(() => {
        console.log('Database Connected');  
       sequelize.query(`SELECT * FROM ${TabelName}`, { type: sequelize.QueryTypes.SELECT })
        // sequelize.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = hr`)
        .then(results => {
          const jsonData = JSON.stringify(results, null, 2);
            fs.writeFile('data.json', jsonData, (err) => {
                if (err) {
                  console.error("Error writing JSON file:", err);
                } else {
                  console.log("JSON file has been saved.");
                }
              });
          res.json({"results":results});
        })
        .catch(error => {
          console.error('Error executing query:', error);
        });
      })
      .catch((err) => {
        console.error('Unable to connect to the DataBase:', err);
      });
    }

