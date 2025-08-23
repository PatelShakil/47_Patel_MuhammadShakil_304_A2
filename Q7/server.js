const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({ secret: "mySecret", resave: false, saveUninitialized: true })
);
app.use(methodOverride("_method"));

// Routes
app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/shop"));
app.use("/api", require("./routes/api"));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
