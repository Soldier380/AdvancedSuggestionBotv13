const mongoose = require('mongoose');
const config = require("./config")
let url = config.Mongo;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
 console.log("Base de datos conectado")
}).catch((err) => {
  console.log(err)
})
