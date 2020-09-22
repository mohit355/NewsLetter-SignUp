

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

  var options ={
    url: "https://us2.api.mailchimp.com/3.0/lists/e8db75d7fa",
    method: "POST",
    headers:{
      "Authorization":"Mohit 3b1f11667ad16e093c3ab3a4db0903ec-us2"
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

//e8db75d7fa
// 3b1f11667ad16e093c3ab3a4db0903ec-us2
