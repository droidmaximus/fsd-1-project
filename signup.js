module.exports={
    validate:function(mailid,password,confirm){
        let atSymbol = mailid.indexOf("@");

        if (atSymbol < 1)
            return alert("Invalid email address");

        let dot = mailid.indexOf(".");
        if (dot <= atSymbol + 2)
            return alert("Invalid email address");

        if (dot === mailid.length - 1)
            return alert("Invalid email address");

        if (password.length < 8)
            return alert("Password must be atleast 8 characters long");
        if (!password.match(/\d/))
            return alert("Password must contain atleast one number");
        if (!password.match(/[a-zA-Z]/))
            return alert("Password must contain atleast one letter");
        if (password != confirm)
            return alert("Passwords don't not match!");

        return true;
    }
}