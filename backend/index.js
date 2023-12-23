const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const user = require("./routes/user");
app.use("/user", user);

const meja = require("./routes/meja");
app.use("/meja", meja);

const menu = require("./routes/menu");
app.use("/menu", menu);

const transaksi = require("./routes/transaksi");
app.use("/transaksi", transaksi);

const detail_transaksi = require("./routes/detail_transaksi");
app.use("/detail_transaksi", detail_transaksi);

app.listen(PORT, () => console.log("server run on port " + PORT));
