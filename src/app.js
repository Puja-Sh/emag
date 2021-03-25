const express = require("express");
const path = require("path");
const hbs = require("hbs");
const nodemailer = require("nodemailer");
// require("dotenv").config();

const app = express();

// app.use(express.static(__dirname + 'public'))
app.use("/style", express.static(path.join(__dirname, "public/style")));
app.use("/script", express.static(path.join(__dirname, "public/script")));
app.use("/image", express.static(path.join(__dirname, "public/image")));

//setting path
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
  // res.sendFile(process.cwd() + "/public/index.html")
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "studyme03@gmail.com",
      pass: "materialaccount1234",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "studyme03@gmail.com",
    subject: req.body.interest,
    text: `some text here ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send('error')
    } else {
      console.log("Email sent: " + info.response);
      res.send('success')
    }
  });
});

app.listen(3000, () => {
  console.log("server state at 3000");
});
