//todo Monggo DB connection Local
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/wpulocal");

// //todo Membuat schema struktur db dari contact
// const Contact=mongoose.model('Contact',{//mongose akan membuat otomatis plural dari "Contact"
//     nama:{//agar data lebih detail maka nama dibuat propertynya
//         type : String,
//         required: true,
//     }
//     ,
//     nohp:{
//         type : String,
//         required: true,
//     },
//     email:{
//         type : String,
//     },
// })

// //todo Menambah 1 data
// const contact1=new Contact({//contact yg baru di create di panggil di sini untuk membuat contact baru
//     nama : "Erika",//parameter nama harus sama dengan modelnya
//     nohp :"0811939922",
//     email :"erika@gmail.com"
// })

// //todo Simpan ke collection database bernama wpulocal

// // contact1.save()//begini aja uda jalan tapi kalau kita pengen lihat resultnya di terminal pake promise
// contact1.save().then((contact)=>console.log(contact))//then kalau berhasil saya pengen mengembalikan data contactnya diconsole
