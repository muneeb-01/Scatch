const express = require("express");
require("./config/mongoose-connection");
const ownersRouter = require("./Routes/ownersRouter");
const productsRouter = require("./Routes/produtcsRouter");
const usersRouter = require("./Routes/usersRouter");
const indexRouter = require("./Routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen("3000");
