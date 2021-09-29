//todo Monggo DB connection Local
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/DataBaseTsel");

// //todo Membuat schema struktur db dari contact
// const Kontak=mongoose.model('Kontak',{//mongose akan membuat otomatis plural dari "Contact"
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
// const kontak1=new Kontak({//contact yg baru di create di panggil di sini untuk membuat contact baru
//     nama : "Billy",//parameter nama harus sama dengan modelnya
//     nohp :"08087722222",
//     email :"bilty@gmail.com"
// })

// //todo Simpan ke collection database bernama DatabaseTsel

// // contact1.save()//begini aja uda jalan tapi kalau kita pengen lihat resultnya di terminal pake promise
// kontak1.save().then((contact)=>console.log(contact))//then kalau berhasil saya pengen mengembalikan data contactnya diconsole
