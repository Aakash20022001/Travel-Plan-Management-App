var express=require("express")
// var connection=require("./Database/conn")
var bodyParser = require('body-parser')
var cors=require("cors")
const conn = require("./Database/conn")
var app=express()
var jsonParser = bodyParser.json()
// app.use(core)
try{
const connection= conn.getConnection();
console.log("DataBase Connection Successful");

}
catch(err){
    console.log("Error Connecting to Database");
}
app.use("/api/v1/users",jsonParser,cors(), require("./Routes/routes"));
app.listen(3300,()=>{
    console.log("server started on port 3300");
})