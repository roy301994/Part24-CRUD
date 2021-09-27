const mongoose = require("mongoose");

//todo Membuat schema struktur db dari contact
const Contact=mongoose.model('Contact',{//mongose akan membuat otomatis plural dari "Contact"
    nama:{//agar data lebih detail maka nama dibuat propertynya
        type : String,
        required: true,
    }
    ,
    nohp:{
        type : String,
        required: true,
    },
    email:{
        type : String,
    },
})
 module.exports= Contact