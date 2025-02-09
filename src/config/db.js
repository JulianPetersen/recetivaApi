import mongoose from "mongoose";

    mongoose.connect('mongodb://localhost/recetivaDB')
        .then(db => console.log('DB is connected'))
        .catch(error => console.log(error))