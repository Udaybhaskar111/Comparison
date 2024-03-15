import datafile from "./datafile.json" assert { type: "json" };
import datadb from "./data.json" assert { type: "json" };
const compareLength = (obj1, obj2) => {
  if (obj1.length == obj2.length) {
    return true;
  }
  return false;
};
export const initialcompare = async (req, res) => {
  if (datafile.length < 1 || datadb.length < 1) {
    if (datadb.length < 1) {
      res.send({ message: "Database data is empty" });
    } else if (datafile.length < 1) {
      res.send({ message: "Data File is empty" });
    }
  } else {
    const obj1 = Object.values(datafile[0]);
    const obj2 = Object.values(datadb[0]);
    if (!compareLength(obj1, obj2)) {
      res.send({ message: "column length is not matching" });
    } else {
      res.send({ message: true });
    }
  }
};
