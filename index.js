const massive = require("massive");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
const Ctrl = require('./products_controller');

const app = express();
app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
    .then(dbInstance => {
  app.set("db", dbInstance);
});

app.get('/api/products', Ctrl.getAll);
app.get( '/api/product/:id', Ctrl.getOne );
app.put('/api/product/:id', Ctrl.update);
app.post('/api/product', Ctrl.create);
app.delete('/api/product/:id', Ctrl.destroy);




app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
