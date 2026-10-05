const { Router } = require("express");
const indexRouter = Router();


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

indexRouter.get("/", (req, res) => {
    res.render("index", {message: "Welcome bastards",title: "Mini messageboard", messages })});

indexRouter.get("/new", (req,res) => {
  res.render("form");
})

indexRouter.post("/new", (req,res)=> {
  messages.push({
    text:req.body.message,
    user: req.body.author,
    added: new Date()
  

  })
    res.redirect("/");
  // accessing the values submitted from form, under req.body.name of the input
  // after POSTing, send user back to homepage to see the new entry
})

indexRouter.get("/message/:id", (req,res) => {
  const message = messages[Number(req.params.id)];
  //req.params is object so need to reach inside of it to get the actual value
  // browser just receives /message/2 it doesn't know what to get just beecause of the number, hence we need to create 
  // a specific route to it, by accessing the message from messages array at that index/

  if(!message) {
    return res.status(404).send("Message not found");
  }
  
  res.render("message", {message});

  
});

module.exports = indexRouter;
