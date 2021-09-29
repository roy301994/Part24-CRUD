const express = require("express"); 
const app = express();
const port = 5010;

const methodOverride = require('method-override')


const { body, validationResult, check } = require("express-validator");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//Database connect ke app.js
require("./Util/db");
const Kontak = require("./model/contact");

//setup method override
app.use(methodOverride('_method'))

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

//todo Halaman Contact
//? 1.Read all contact (CRUD)

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
  const contactsA = await Kontak.find(); // find artinya carikan semua data contact,find bentuknya masih promise maka agar ada resultnya butuh pake then
  res.render("contact", {
    contactsB: contactsA,
    msg: req.flash("msg"),
  });
});

//? 2.ADD Contact (CRUD)
//route add ditaruh sebelum route detail contact agar add tidak terbaca sebagai nama
app.get("/contact/add", (req, res) => {
  res.render("add-contact");
});

//todo proses Add data contact

app.post(
  "/contact",
  [
    body("nama").custom(async(value) => {
      // const duplicate = checkDuplicateContact(value);//cara check manual
      const duplicate = await Kontak.findOne({ nama: value }); //nama:value kita buat sebagai filter
      if (duplicate) {
        throw new Error("This name is already taken"); //kalau true maka pesan error akan tampil
      }
      return true;
    }),
    check("email", "Your email is not valid").isEmail(),
    check("noHP", "Your phone number is not valid").isMobilePhone("id-ID"),
  ],
   (req, res) => {
    const errors = validationResult(req); //kalau dari pengecekan ada error maka akan masuk ke sini
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        //kalau ada error yg akan ditampilkan ini
        title: "Form Add Data Contact",
        errors: errors.array(),
      });
    } else { //kalau pengecekan lolos semua dia akan masuk ke sini
          Kontak.insertMany(req.body,(error,result)=>{
          req.flash("msg", "Data has added successfully !");//kirimkan flash message
          res.redirect("/contact");
        })
      }
  }
);

//? 3.delete contact (CRUD)


app.delete('/contact',(req,res)=>{
  // res.send(req.body)//mengecheck apakah nama sudah terkirim
  Kontak.deleteOne({ nama: req.body.nama }, (result) => {
          req.flash("msg", "Data has deleted successfully !");
          res.redirect("/contact");
        });
})


// app.get("/contact/delete/:nama", async (req, res) => {
//   const contactC = await Kontak.findOne({ nama: req.params.nama }); //kalau dilihat di web browser domain habis delete ada tulisan nama maka difilter berdasarkan nama
//   if (!contactC) {
//     //menampung pesan error kalaumisal user nulis nama yg tidak ada dicontact /contact/delete/somina
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     Kontak.deleteOne({ _id: contactC._id }, (result) => {
//       req.flash("msg", "Data has deleted successfully !");
//       res.redirect("/contact");
//     });
//   }
// });

//todo Halaman Update Contact
//? 4.Update one Contact (CRUD)
app.get("/contact/edit/:nama", async (req, res) => {
  // const contactC = findContact(req.params.nama);
  const contactC = await Kontak.findOne({nama:req.params.nama})
  res.render("edit-contact", {
    contactD: contactC,
  });
});

//todo proses Update data contact
app.put(
  "/contact",
  [
    body("nama").custom(async(value, { req }) => {
      const duplicate = await Kontak.findOne({nama:value})
      if (value !== req.body.oldNama && duplicate) {
        throw new Error("This name is already taken");
      }
      return true
    }),
    check("email", "Your email is not valid").isEmail(),
    check("noHP", "Your phone number is not valid").isMobilePhone("id-ID")
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form edit Data Contact",
        errors: errors.array(), 
        contactD: req.body,
      });
    } else {
      Kontak.updateOne(
        {
        _id:req.body._id
        },{
          $set:{
            nama:req.body.nama,
            nohp:req.body.noHP,
            email:req.body.email
          }
        }
      ).then((result)=>{
        req.flash("msg", "Data contact has changed successfully !");
        res.redirect("/contact");
      })
      
    }
  }
);



//todo Halaman detail Contact
//? 1.Read one contact (CRUD)

app.get("/contact/:nama", async (req, res) => {
  // const contactC = findContact(req.params.nama)
  const contactC = await Kontak.findOne({ nama: req.params.nama }); //cari contact berdasarkan nama tapi mengunakan method dari mongodb "findOne"
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

















      //halaman proses add contact
      // addContact(req.body);
      // req.flash("msg", "Data has added successfully !");
      // res.redirect("/contact");

          
      //halaman delete contact
      // deleteContact(req.params.nama);
      //kirim flash messagge
      // req.flash("msg", "Data has deleted successfully !");
      // res.redirect("/contact");
      // res.send("ok");