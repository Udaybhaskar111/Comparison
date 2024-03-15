import datafile from "../datafile.json" assert { type: "json" };
import datadb from "../data.json" assert { type: "json" };
import { json2csv } from "json-2-csv";
import * as fs from "fs";
let userfile = [];
const compareObject = (obj1, obj2, body) => {
  if (body.length > 0) {
    for (let i = 0; i < obj2.length; i++) {
      if (obj2[i] == null && obj1[i] == null) {
        continue;
      } else if (obj2[i] == "" && obj1[i] == null) {
        continue;
      }
      let valueType = typeof obj2[body[i]];
      console.log(valueType, "ll");
      if (obj1[i] !== obj2[body[i]]) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < obj2.length; i++) {
      if (obj2[i] == null && obj1[i] == null) {
        continue;
      } else if (obj2[i] == "" && obj1[i] == null) {
        continue;
      }
      let value = typeof obj2[i];
      switch (value) {
        case "number":
          obj1[i] = Number(obj1[i]);
          break;
        case "string":
          obj1[i] = String(obj1[i]);
          break;
        case "boolean":
          obj1[i] = Boolean(obj1[i]);
          break;
        case "date":
          obj1[i] = Date(obj1[i]);
        default:
          return false;
      }
      if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
    return true;
  }
};
const compareLength = (obj1, obj2) => {
  if (obj1.length == obj2.length) {
    return true;
  }
  return false;
};
export const compare = async (req, res) => {
  userfile = [];
  let lostDataInFile = [];
  const { body } = req;
  let sameCount = true;
  let sameType = true;
  let oneTimeCheck = true;
  for (let i = 0; i < datafile.length; i++) {
    let flag = false;
    for (let j = 0; j < datadb.length; j++) {
      const obj1 = Object.values(datafile[i]);
      const obj2 = Object.values(datadb[j]);
      if (oneTimeCheck) {
        oneTimeCheck = false;
        if (!compareLength(obj1, obj2)) {
          sameCount = false;
        }
      }
      if (!sameType || !sameCount) {
        break;
      }
      console.log(obj1.length, obj2.length, "as lengths");
      if (compareObject(obj1, obj2, body)) {
        flag = true;
        break;
      }
    }
    if (flag == false) {
      lostDataInFile.push({ data: datafile[i], index: i });
      userfile.push(datafile[i]);
    }
    if (!sameCount || !sameType) {
      break;
    }
  }
  if (!sameCount) {
    res.send({
      Filedata: datafile,
      LostData: lostDataInFile,
      message: "The number of columns are not matching",
    });
  } else if (!sameType) {
    res.send({
      Filedata: datafile,
      LostData: lostDataInFile,
      message: "The types of columns are not matching",
    });
  } else {
    res.send({ Filedata: datafile, LostData: lostDataInFile, message: "" });
  }
};
export const sendfile = async (req, res) => {
  console.log(userfile, "as lost ");
  const csv = json2csv(userfile);
  console.log(csv, "format");
  fs.writeFile("missingdata.csv", csv, (error) => {
    if (error) {
      console.log(error);
      res.send("try after some time");
    } else {
      const filePath = "./missingData.csv";
      const fileName = "data.csv";
      res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
      res.setHeader("Content-Type", "text/csv");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
  });
};
