module.exports={
    validate:function(mailid,password,confirm,callback){
        mailid = mailid.trim();
        password = password.trim();
        confirm = confirm.trim();
        let atSymbol = mailid.indexOf("@");

        if (atSymbol < 1)
            return callback = "Invalid email address";

        let dot = mailid.indexOf(".");
        if (dot <= atSymbol + 2)
            return callback = "Invalid email address";

        if (dot === mailid.length - 1)
            return callback="Invalid email address";

        if (password.length < 8)
            return  callback="Password must be atleast 8 characters long";
        if (!password.match(/\d/))
            return  callback="Password must contain atleast one number";
        if (!password.match(/[a-zA-Z]/))
            return  callback="Password must contain atleast one letter";
        if (password != confirm)
            return  callback="Passwords don't not match!";

        return true;
    }
}