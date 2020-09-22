

const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
// const mailchimp = require('@mailchimp/mailchimp_marketing');
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));




app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});





app.post("/",function(req,res){
  var firstName=req.body.fname;
  var lastName=req.body.lname;
  var email=req.body.email;

var data={
  members:[
    {
      email_address:email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
}

var jsondata=JSON.stringify(data);

  // XXXX- Replace this with the last 4 digit of the API KEY
  // XXXXXXX - Replace this with the list key
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  - Replace this with API KEY
  var options ={
    url: "https://XXXX.api.mailchimp.com/3.0/lists/XXXXXXX",   
    method: "POST",
    headers:{
      "Authorization":"Mohit XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    body: jsondata
  }

request(options,function(error,response,body){
  if(error){
    res.send("Error");
  }
  else {
    if(response.statusCode==200){
        res.sendFile(__dirname+ "/success.html");
    }
    else {
        res.sendFile(__dirname+ "/failure.html");
    }

  }
})



})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000 ,function(){
  console.log("server is running at port number 3000");
})


