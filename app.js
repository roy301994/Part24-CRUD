const express = require("express");
const app = express();
const port = 3000;

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//Database connect ke app.js
require("./Util/db");
const Contact = require("./model/contact");

//setup config flash

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

//todo Set-up EJS
app.set("view engine", "ejs");

//todo Set-up Public
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//todo Halaman Home

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      namaMHS: "Mahasiswa A",
      emailMHS: "A@email.com",
    },
    {
      namaMHS: "Mahasiswa B",
      emailMHS: "B@email.com",
    },
    {
      namaMHS: "Mahasiswa C",
      emailMHS: "C@email.com",
    },
  ];

  res.render("index", {
    nama: "roy naldo nathaniel",
    title: "Halaman Home",
    mahasiswa: mahasiswa,
  });
});

//todo Halaman about

app.get("/about", (req, res) => {
  res.render("about");
});

//todo Halaman Contact Form

app.get("/contact", async (req, res) => {
  //promise
  //     Contact.find().then((contact)=>{
  //     res.send(contact)
  // })
  // db json
  //     const contactsA = loadData()
  //     res.render("contact", {
  //       contactsB: contactsA,
  //       msg: req.flash("msg")
  //     });
  //   })

  //db mongoose
  const contactsA = await Contact.find()// find artinya carikan semua data contact,find bentuknya masih promise maka agar ada resultnya butuh pake then
  res.render("contact", {
    contactsB: contactsA,
    msg: req.flash("msg"),
  });
});

//Halaman detail Contact

app.get("/contact/:nama", async (req, res) => {
  // const contactC = findContact(req.params.nama)
  const contactC = await Contact.findOne({ nama: req.params.nama }); //cari contact berdasarkan nama tapi mengunakan method dari mongodb "findOne"
  //arti command diatas kita cari 1 file dari data contact berdasarkan filter "nama" dimana diambil dari url req.params.nama
  res.render("detail", {
    contactD: contactC,
  });
});
//async dan await digunakan untuk menangani promise 
//function dibuat ke async,sehingga kalau ada promise tunggu dulu sampe promisenya resolve,kalau uda resolve masukin ke variable contactA
//karena adanya async await kita tidak perlu lagi then dan catch
//segala yg konek ke database butuh promise tapi bisa diganti ke async dan await

//todo Set-up webserver
app.listen(port, () => {
  console.log(`Mongo Contact App| listening at http://localhost:${port}`);
});
