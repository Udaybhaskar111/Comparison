// import datafile from "./datafile.json" assert { type: "json" };
// import datadb from "./data.json" assert { type: "json" };
// let modifiedData=[];
// const getSameTypes=(obj1,obj2)=>{
//     let obj2=Object.values(datadb[0]);
//     for (let i = 0; i < obj2.length; i++) {
//     let obj1=Object.values(datafile[i]);
//     if (obj2[i] == null && obj1[i] == null) {
//         continue;
//       } else if (obj2[i] == "" && obj1[i] == null) {
//         continue;
//       }
//       let value = typeof obj2[i];
//       console.log(value)
//       try{
//       switch (value) {
//         case "number":
//           obj1[i] = Number(obj1[i]);
//           break;
//         case "string":
//           obj1[i] = String(obj1[i]);
//           break;
//         case "boolean":
//           obj1[i] = Boolean(obj1[i]);
//           break;
//         case "date":
//           obj1[i] = Date(obj1[i]);
//         default:
//           obj1[i]=obj1[i];
//       }
//       console.log(obj1[i],"ad")
//     }
//     catch(error){
//       return false;
//     }
// }
// // modifiedData.push(o)
// return true;
// }
// export const opt=()=>{
//     console.log("optimisation")
//     let datatypes=[];
//     let isDataTypeMatches=true;
//     if(isDataTypeMatches){
//         isDataTypeMatches=false;
//         for(let i=0;i<datafile.length;i++){
//             if(getSameTypes(obj1,obj2)){
//                 datatypes.push(datafile[i])
//             }
//         }
//         console.log(datatypes,"as items")
//     }

// }
