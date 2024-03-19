import datafile from "../../constants/datafile.json" assert { type: "json" };
import datadb from "../../constants/data.json" assert { type: "json" };
export const sendheader = async (req, res) => {
  const obj1 = Object.keys(datafile[0]);
  const obj2 = Object.keys(datadb[0]);
  res.send({ file: obj1, database: obj2 });
};
