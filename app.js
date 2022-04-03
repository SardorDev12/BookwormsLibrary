const express = require('express');
const todoController = require('./controllers/todoController')

const app = express();


//templete engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'))

//fire controllers
todoController(app);

//port
app.listen(3000, ()=>{
    console.log("Server is running on port 3000...");
})