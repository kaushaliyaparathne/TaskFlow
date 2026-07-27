const bcrypt = require("bcryptjs");

const password = "admin123";


bcrypt.hash(password, 10)
.then((hash)=>{

    console.log("Admin Password Hash:");
    console.log(hash);

});