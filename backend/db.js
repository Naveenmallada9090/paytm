const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://malladanaveen_db_user:Q5L12IZmkXDO3N5v@cluster0.e1vlksr.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}