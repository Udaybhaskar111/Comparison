// import datafile from "../constants/datafile.json" assert { type: "json" };
// import datadb from "../constants/data.json" assert { type: "json" };
// import primaryKey from '../constants/primarykey.json' assert {type:"json"};
// import { json2csv } from "json-2-csv";
// // import {optimise} from "./optimise.js"
// import * as fs from "fs";
// import { Router } from "express";
// import { assert } from "console";
// import { type } from "os";
// let mismatch=[]

// export const compare = async (req, res) => {
//  let dataDB2={};
// //  let {body}=req;
//   const key = primaryKey[0].primarykey; 
//   for (const record of datadb) {
//     const key = primaryKey[0].primarykey; 
//     dataDB2[record[key]] = record;
// }
//   for(let i = 0; i < datafile.length; i++)
//   {
//     const dataFileprimaryValue=datafile[i][key];
//     const dbRecord= dataDB2[dataFileprimaryValue];
//     let dataRecord=Object.values(datafile[i]);
//     if(dbRecord){
//     const dbRecordValues=Object.values(dbRecord)
//     for(let j=0;j<dataRecord.length;j++){
//       let type = typeof dbRecordValues[i];
//       try{
//         switch (type) {
//           case "number":
//             dataRecord[i] = Number(dataRecord[i]);
//             break;
//           case "string":
//             dataRecord[i] = String(dataRecord[i]);
//             break;
//           case "boolean":
//             dataRecord[i] = Boolean(dataRecord[i]);
//             break;
//           case "date":
//             dataRecord[i] = Date(dataRecord[i]);
//           default:
//             dataRecord[i]=dataRecord[i];
//         }
//       }
//       catch(error){
//         console.log("hello");
//       }
//       if((dbRecordValues[j]==dataRecord[j]) || (dbRecordValues[j] == null && dataRecord[j] == null) || (dbRecordValues[j] == "" && dataRecord[j] == null)){
//         // if (type=="string"){
//         //   if(dataRecord[i].toLowerCase() !== dbRecordValues[i].toLowerCase()) {
//         //     mismatch.push(dataRecord)
//         //   }
//         // } 
//         continue;
//       }
//       else{
//         mismatch.push(dataRecord)
//         break;
//       }
//     }
//   }
//   else{
//     mismatch.push(dataRecord)
//   }
// }
//   console.log(mismatch,"mismatches")
// };

// export const sendfile = async (req, res) => {
//   console.log(mismatch, "as lost ");
//   const csv = json2csv(mismatch);
//   console.log(csv, "format");
//   fs.writeFile("missingdata.csv", csv, (error) => {
//     if (error) {
//       console.log(error);
//       res.send("try after some time");
//     } else {
//       const filePath = "./missingData.csv";
//       const fileName = "data.csv";
//       res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
//       res.setHeader("Content-Type", "text/csv");
//       const fileStream = fs.createReadStream(filePath);
//       fileStream.pipe(res);
//     }
//   });
// };

import datafile from "../constants/datafile.json" assert { type: "json" };
import datadb from "../constants/data.json" assert { type: "json" };
import primaryKey from '../constants/primarykey.json' assert {type:"json"};
import { json2csv } from "json-2-csv";
import * as fs from "fs";
let mismatch = [];
export const compare = async (req, res) => {
  const {body}=req;
  console.log(body.length,"ak")
  console.log(body)
  mismatch=[]
  console.log(mismatch,"initaial")
  const key = primaryKey[0].primarykey;
  let dataDB2 = {};
  for (const record of datadb) {
    dataDB2[record[key]] = record;
  }

  for (let i = 0; i < datafile.length; i++) {
    const dataFileprimaryValue = datafile[i][key];
    const dbRecord = dataDB2[dataFileprimaryValue];
    if (dbRecord) {
      const dbRecordValues = Object.values(dbRecord);
      let dataRecord = Object.values(datafile[i]);
      for (let j = 0; j < dataRecord.length; j++) {
        if(body.length>0){
        if ((dbRecordValues[j] == dataRecord[body[j]]) || (dbRecordValues[body[j]] == null && dataRecord[body[j]] == null) || (dbRecordValues[body[j]] == "" && dataRecord[body[j]] == null)) {
          continue;
        } else {
          mismatch.push(datafile[i]);
          break;
        }}
        else{
          if ((dbRecordValues[j] == dataRecord[j]) || (dbRecordValues[j] == null && dataRecord[j] == null) || (dbRecordValues[j] == "" && dataRecord[j] == null)) {
            continue;
          } else {
            mismatch.push(datafile[i]);
            break;
          }
        }
      }
    } 
    else {
      mismatch.push(datafile[i]);
    }
  }
  res.send({ Filedata: datafile, LostData: mismatch, message: "" });
  console.log(mismatch, "mismatches");
};

export const sendfile = async (req, res) => {
   const csv = json2csv(mismatch);
  console.log(csv, "format");
  fs.writeFile("./missingdata.csv", csv, (error) => {
    if (error) {
      console.log(error);
      res.send("try after some time");
    } else {
      const filePath = "./missingdata.csv";
      const fileName = "missingdata.csv";
      res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
      res.setHeader("Content-Type", "text/csv");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
  });
};
