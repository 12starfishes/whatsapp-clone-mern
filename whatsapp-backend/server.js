//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });

// cors replaces the above lines with same functionality
app.use(cors());

// DB config

const pusher = new Pusher({
  appId: "1418651",
  key: "8b735b674d7acc71c47b",
  secret: "f10ecfb694c44e4bf40b",
  cluster: "eu",
  useTLS: true,
});

const connection_url =
  "mongodb+srv://subh:srTAuCRD0EiNWcqH@cluster0.iyo82.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url);

const db = mongoose.connection;

db.once("open", () => {
  console.log("db is connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

// ??????

// api routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  // console.log(req.body);

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => {
  console.log(`Listening on Localhost:${port}`);
});

// srTAuCRD0EiNWcqH

// mongodb+srv://subh:<password>@cluster0.iyo82.mongodb.net/?retryWrites=true&w=majority
