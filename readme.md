const workbook = XLSX.readFile(filepath);
        const sheet_name_list = workbook.SheetNames;
        let jsonPagesArray = [];
        sheet_name_list.forEach(function(sheet) {
                const jsonPage = {
                    name: sheet,
                    content: XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {defval:null})
                };
                jsonPagesArray.push(jsonPage);
            });


             if(obj2[i]==null && obj1[i]==null){
            continue;
        }
        else if(obj2[i]=="" && obj1[i]==null){
            console.log("coming")
            continue;
        }
        if(obj1[i]!==obj2[i] ){
            return false;
        }


        sequelize
  .query(
    'SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = :tableName',
    {
      replacements: { tableName: 'orders_info' },
      type: sequelize.QueryTypes.SELECT,
    }
  )
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error('Error executing query:', error);
  });
