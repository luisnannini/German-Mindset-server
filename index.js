const express = require('express');
const app = express();
const port = process.env.port || 5000;;

app.listen(port, ()=>
console.log("server started on port 5000"))

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Psychologist
app.use("/psychologist-interviews", require("./controllers/psychologist-interview"));

//Interviews
app.use("/company-interviews", require("./controllers/company-interviews"));