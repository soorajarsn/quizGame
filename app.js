const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const routes = require('./backend/routes/mainRoutes');
const app = express();

app.use(express.static(path.join(__dirname,"client/dist")));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/',routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{console.log(`Server started running on the Port ${PORT}`)});