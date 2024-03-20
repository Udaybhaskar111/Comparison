import csv from "csvtojson";
import XLSX from "xlsx";
import * as fs from "fs";
export const send = async (req, res) => {
  try {
    if (req.file == null) {
      res.status(400).send("NO file is uploaded");
    } else {
      if (req.file.mimetype === "text/csv") {
        try {
          if (req.file == null) {
            res.status(400).send("NO file is uploaded");
          } else {
            const csvFilePath = "uploads/" + req.file.filename;
            csv({
              checkType: true,
              defval: null,
            })
              .fromFile(csvFilePath)
              .then((jsonObj) => {
                console.log(jsonObj, "object");
                const jsonData = JSON.stringify(jsonObj, null, 2);
                fs.writeFile("constants/datafile.json", jsonData, (err) => {
                  if (err) {
                    console.error("Error writing JSON file:", err);
                  } else {
                    console.log("JSON file has been saved.");
                  }
                });
                res.send(jsonObj);
              });
            const jsonArray = await csv().fromFile(csvFilePath);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const filepath = "uploads/" + req.file.filename;
        // const excelData = exceltojson({
        //   sourceFile: filepath,
        // });
        const workbook = XLSX.readFile(filepath);
        const sheet_name_list = workbook.SheetNames;
        let jsonPagesArray = [];
        sheet_name_list.forEach(function (sheet) {
          const jsonPage = {
            name: sheet,
            content: XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              defval: null,
            }),
          };
          jsonPagesArray.push(jsonPage);
        });
        console.log(jsonPagesArray[0], "as first page");
        // res.json(jsonPagesArray[0]);

        const jsonData = JSON.stringify(jsonPagesArray[0].content);
        fs.writeFile("constants/datafile.json", jsonData, (err) => {
          if (err) {
            console.error("Error writing JSON file:", err);
          } else {
            console.log("JSON file has been saved.");
          }
        });
        res.status(200).json(jsonData);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
