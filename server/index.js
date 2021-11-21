require('dotenv').config()
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const PORT= process.env.PORT || 5000;

const uri="mongodb+srv://aaryantyagi:aaryantyagi@cluster0.iwr2s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connect = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => console.log("Connection Established..")
).catch((err) => console.log(err));

require("./models/user");
require("./models/meeting");
app.use(express.json());

app.use(require("./routes/user"));
app.use(require("./routes/schedule"));
app.use(require("./routes/getMeetings"));

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on ",PORT);
})