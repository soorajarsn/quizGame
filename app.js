const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const routes = require('./backend/routes/mainRoutes');
const app = express();

const socket = require('socket.io');
const http = require('http').createServer(app);
const io = socket(http);

io.on('connection',socket => {
    let interval;
    console.log("client connected");
    socket.on('start_timer',token => {
        console.log(token);
        interval = setInterval(()=> {
            socket.emit('time_up',token);
        },1000*60*30);
    })
});

app.use(express.static(path.join(__dirname,"client/dist")));
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/',routes);

const PORT = process.env.PORT || 3000;

http.listen(PORT,()=>{console.log(`Server started running on the Port ${PORT}`)});