const express = require("express");
const app= express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded( {extended:true} ));
app.use(methodOverride("_method"));

main()
.then((res) => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let port = 8080;

app.listen(8080, () =>{
    console.log(`app is listening on ${port}`);
})

app.get("/" , (req,res) =>{
    res.send("port is working");
});

app.get("/chats" , async (req,res) =>{
     let chats = await Chat.find();
    //  console.log(chats);
    //  res.send("working");
     res.render("index.ejs",{chats});
});


// let chat1 = new Chat({
//     from:"neha",
//     to:"shreya",
//     msg : "send me your nudes",
//     created_at : new Date(),
// })

// chat1.save()
// .then((res) =>{
//     console.log(res);
// }).catch((err) =>{
//     console.log(err);
// })


//New route
app.get("/chats/new" , (req,res) => {
    res.render("form.ejs");
})

//Create Route
app.post("/chats" , (req,res) =>{
    let { from,msg,to } = req.body;

    let newChat = new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at: Date()
    });

    newChat.save()
    .then((res) => {
        console.log("saved successfully");
    })
    .catch((err) =>{
        console.log(err);
    })
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit",async (req,res) => {
    let { id } =req.params;
    let post = await Chat.findById(id);
    res.render("editform.ejs" ,{post});
});

app.put("/chats/:id",async (req,res) => {
    let { id } = req.params;
    let {msg : newMsg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id, {msg : newMsg},{runValidators:true , new:true});

    console.log(updateChat);
    res.redirect("/chats");

});


app.delete("/chats/:id", async (req,res) => {
    let { id } = req.params;
    
    let DeletedChat =await Chat.findByIdAndDelete(id);

    console.log(DeletedChat);
    res.redirect("/chats");
    
});