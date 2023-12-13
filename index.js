const express = require("express");
const app = express();
require("./db/conn");
// const router = require("./routes/router");
const cors = require("cors");
const port = 8009;
// const userRoute = require("./routes/users");
// const pinRoute = require("./routes/pins");
// const web3Route = require("./routes/Web3route");
// const customerRoute = require("./routes/customer");
const routes = require("./routes/router");
app.use(express.json());
app.use(cors());
// app.use(router);
app.use("/api", routes);

app.listen(port, () => {
  console.log(`server start at port no : ${port}`);
});
