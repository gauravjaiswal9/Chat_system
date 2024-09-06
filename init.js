const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then((res) => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allchat = [
    {
        from:"neha",
        to:"shreya",
        msg : "send me your notes",
        created_at : new Date(),
    },
    {
        from:"ananya",
        to:"shreya",
        msg : "send me your notes",
        created_at : new Date(),
    },
    {
        from:"sakshi",
        to:"priya",
        msg : "send me your notes",
        created_at : new Date(),
    },
    {
        from:"anushka",
        to:"shj",
        msg : "send me your notes",
        created_at : new Date(),
    },

]

Chat.insertMany(allchat);