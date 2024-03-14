// import { Sequelize } from "sequelize";
// import exceltojson from "convert-excel-to-json";
// import csv from "csvtojson";
// import fs from "fs-extra";
// const compareObject=(obj1,obj2)=>{
//     for(let i=0;i<obj1.length;i++){
//         if(obj1[i]!==obj2[i] ){
//             return false;
//         }
//     }
//     return true;
// }
// export const all =async(req,res)=>{
//       const {body}=req;
//       const {TabelName,DBtype,passwd,user_id,DBname}=body;
//       const sequelize = new Sequelize(DBname, user_id, passwd, {
//       host: 'localhost',
//       dialect: 'mysql',
//     });
//     let datafromDb=[];
//     let datafromFile=[];
//     sequelize.authenticate().then(() => {
//         console.log('Database Connected');  
//         sequelize.query(`SELECT * FROM ${TabelName}`, { type: sequelize.QueryTypes.SELECT })
//         .then(results => {
//           console.log(results); 
//           datafromDb=results;
//           res.json({"results":results});
//         })
//         .catch(error => {
//           console.error('Error executing query:', error);
//         });
//       })
//       .catch((err) => {
//         console.error('Unable to connect to the DataBase:', err);
//       });

//   try {
//     if (req.file == null) {
//       res.status(400).send("NO file is uploaded");
//     } else {
//       if (req.file.mimetype === "text/csv") {
//         try {
//           if (req.file == null) {
//             res.status(400).send("NO file is uploaded");
//           } else {
//             const csvFilePath = "uploads/" + req.file.filename;
//             csv()
//               .fromFile(csvFilePath)
//               .then((jsonObj) => {
//                 console.log(jsonObj);
//                 datafromFile=jsonObj;
//                 res.send(jsonObj)
//               });
//             const jsonArray = await csv().fromFile(csvFilePath);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       } else {
//         const filepath = "uploads/" + req.file.filename;
//         const excelData = exceltojson({
//           sourceFile: filepath,
//           header: {
//             rows: 1,
//           },
//           columnToKey: {
//             "*": "{{columnHeader}}",
//           },
//         });
//         console.log(excelData);
//         datafromFile=excelData.sheet1;
//         fun();
//         res.status(200).json(excelData);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
 
// };

// function fun(){
//     let tempData=[];
//     console.log(datafromFile,"data from file")
//     tempData=[...datafromFile];  
//     let tempDatafromDb=[];
//     tempDatafromDb=[...datafromDb];
//     console.log(data,"getting data");
//     console.log(datafromDb,"getting file");
//   for(let i=0;i<datafromFile.length;i++){
//     let flag=false;
//     for(let j=0;j<datafromDb.length;j++){
//         console.log()
//        const obj1= Object.values(datafromFile[i]);
//         const obj2 =Object.values(datafromDb[j]);
//         if(compareObject(obj1,obj2)){
//             flag=true;
//             flag=data[i];
//             tempData.splice(data[i],i);
//             tempDatafromDb.splice(datafromDb[j],j)
//             break;
//         }
//         else{
//             flag=data[i];
//         }
//     }
//     console.log(tempData,"as frl");
// console.log(tempDatafromDb,"as db")
// res.send("done");
//   }
// }