import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import route from "./routes.js";
import cors from "cors";
import { send } from "./excel.js";
import { sqlite } from "./sqliteConnection.js";
import { initialcompare } from "./initialcompare.js";
import { oracle } from "./oracle.js";
// import {all} from './all.js';
// import {opt} from './optimisedCompare.js'
import { sendheader } from "./sendheader.js";
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
app.use("/sqlite", sqlite);
// app.use("/oracle", oracle);

app.use("/", route);
app.listen(8082, () => console.log("connected"));
