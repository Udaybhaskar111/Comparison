import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import route from "./routes/routes.js";
import cors from "cors";
import { send } from "./controllers/fileupload/excel.js";
import { sqlite } from "./sqliteConnection.js";
// import { sequelize } from "./config/sequlize.js";
import { initialcompare } from "./controllers/initialcompare.js";
import { oracle } from "./config/oracle.js";
// import {all} from './all.js';
// import {opt} from './optimisedCompare.js'
import { sendheader } from "./controllers/fileupload/sendheader.js";
// import { optimise } from "./optimise.js";
const app = express();
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
const upload = multer({ dest: "uploads/" });
app.use("/file", upload.single("file"), send);
app.use(bodyParser.json());
// app.use('/opt',opt)
app.use("/info", sendheader);
app.use("/initialCompare", initialcompare);
<<<<<<< HEAD
app.use("/sqlite", sqlite);
// app.use("/oracle", oracle);

=======
// app.use("/sqlite", sqlite);
// app.use("/oracle", oracle);
// app.post('/',optimise);
// app.use('/',sequelize)
>>>>>>> e277584ee7f86fb6eaa53bea1c059426ffb48cbe
app.use("/", route);
app.listen(8082, () => console.log("connected"));
