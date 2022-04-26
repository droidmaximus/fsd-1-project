function validatecontactus()
    {
        
        let names = document.getElementById("name").value;
        
        if (names.length < 3)
            return alert("name must be atleast 3 characters long");

        let emailid = document.getElementById("email1").value;
        let atSymbol = emailid.indexOf("@");

        if (atSymbol < 1)
            return alert("Invalid email address");

        let dot = emailid.indexOf(".");
        if (dot <= atSymbol + 2)
            return alert("Invalid email address");

        if (dot === emailid.length - 1)
            return alert("Invalid email address");

        return true;
    }