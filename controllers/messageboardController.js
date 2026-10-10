const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const lengthErr = (min,max) => `must be between ${min} and ${max} characters.`;

const validateMessage = [
  body("author")
    .trim()
    .notEmpty().withMessage("Author is required.")
    .isLength({ min: 1, max: 20 }).withMessage(`Author ${lengthErr(1, 20)}`),
  body("message")
    .trim()
    .notEmpty().withMessage("Message is required.")
    .isLength({ min: 1, max: 200 }).withMessage(`Message ${lengthErr(1, 200)}`),
];

exports.messageListGet = async (req,res) => {
    const messages = await db.getAllMessages();
    res.render("index", 
        {
         message: "welcome DB bastards", 
         title: "Mini messageboard",
         messages,
        })

}

exports.messageCreateGet = (req,res) => { 
    res.render("form", {title: "New message"});

}

exports.messageCreatePost = [
  validateMessage, 
  async (req,res) => { 
    const errors = validationResult(req);

    if(!errors.isEmpty()) { 
      return res.status(400).render("form", {
        title: "New message",
        errors: errors.array(),
        author: req.body.author,
        message: req.body.message,
      })
    }

    const {author, message} = matchedData(req);
    await db.insertMessage(author,message);
    res.redirect("/");
},
];

exports.messageGet = async (req,res) => { 
    
    const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(404).send("Message not found");
  }

  const message = await db.getMessage(id);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { message });
}
