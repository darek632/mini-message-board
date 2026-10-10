const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }))
// to allow data from POST to be read as objects


// app.get("/", (req, res) => res.send("Hello message board"));
//this gets handled within the index router, among the other requests.



const links = [
    {href: "/", text: "Home"},
    {href: "/new", text: "New" }
]

app.locals.links = links;

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", indexRouter);
// app.use("/new", newMessageRouter);

// app.get("/", (req,res)=> {
//     res.render("index",{links})
// }) 
// ideally want this routed via routes





const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
