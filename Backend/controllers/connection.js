import * as fs from "fs";
import { Sequelize } from "sequelize";
export const connection =async(req,res)=>{
      const {body}=req;
      console.log(body)
      const {TabelName,DBtype,passwd,user_id,DBname}=body;
      const sequelize = new Sequelize(DBname, user_id, passwd
    , {
      host: 'localhost',
      dialect: DBtype,
    }); 
    const primaryKeyQuery = `
      SELECT column_name
      FROM information_schema.columns
      WHERE information_schema.columns.table_name = '${TabelName}'
      AND column_name IN (
        SELECT column_name
        FROM information_schema.table_constraints
        JOIN information_schema.constraint_column_usage USING (constraint_schema, constraint_name)
        WHERE constraint_type = 'PRIMARY KEY'
        AND information_schema.table_constraints.table_name = '${TabelName}'
      );
      `;
    const [primaryKey] = await sequelize.query(primaryKeyQuery, { type: Sequelize.QueryTypes.SELECT });
    const primaryKeyColumnName = primaryKey ? primaryKey.column_name : null;
    console.log(primaryKeyColumnName,"as")
    const key = JSON.stringify( [{"primarykey":primaryKeyColumnName}], null, 2);
      fs.writeFile('constants/primarykey.json',key, (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file has been saved.");
      }
    });
     sequelize.authenticate().then(() => {
        console.log('Database Connected');  
      
       sequelize.query(`SELECT * FROM ${TabelName}`, { type: sequelize.QueryTypes.SELECT })
        // sequelize.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = hr`)
        
        .then(results => {
          const jsonData = JSON.stringify(results, null, 2);
            fs.writeFile('constants/data.json', jsonData, (err) => {
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
