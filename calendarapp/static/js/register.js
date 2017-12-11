function test() {
    alert("Link is successful!");
}

function setErrorField(message) {
    document.getElementById("errorField").innerHTML = "";
    var errorMessageF = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>";
    var errorMessageB = "</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    document.getElementById("errorField").innerHTML = errorMessageF + message + errorMessageB;
}

// the helper function to validate the email format.
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateInput() {
    var email = document.getElementById("InputEmail").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    console.log(email);
    console.log(password1);
    console.log(password2);
    console.log(firstname);
    console.log(lastname);
    if (email == null || email == "") {
        setErrorField("Your Input Email Address cannot be empty!");
        return false;
    }
    if (password1 == null || password1 == "") {
        setErrorField("Your Input Password cannot be empty!");
        return false;
    }
    if (password2 == null || password2 == "") {
        setErrorField("Your Re-enter Password cannot be empty!");
        return false;
    }
    if (firstname == null || firstname == "") {
        setErrorField("Your Input First Name cannot be empty!");
        return false;
    }
    if (lastname == null || lastname == "") {
        setErrorField("Your Input Last Name cannot be empty!");
        return false;
    }
    if (!validateEmail(email)) {
        setErrorField("Your Input Email Address is invalid!");
        return false;
    }
    if (password1 != password2) {
        setErrorField("Your Input Password doesn't match with each other!");
        return false;
    }
    return true;
}

function register() {
    if (!validateInput()) {
        return;
    }
    console.log("validation success!");
    // send ajax requset to the register 
    var email = document.getElementById("InputEmail").value;
    var password = document.getElementById("password1").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var xhttp = new XMLHttpRequest();
    var params = "email=" + email + "&password=" + password + "&firstname=" + firstname + "&lastname=" + lastname;
    xhttp.open("POST", "http://localhost:8000/registerCheck/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    // get the http response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText == "exists") {
                setErrorField("Input Email Address already exists, please choose another one!");
                return;
            }
            if (this.responseText == "true") {
                window.location.href = "http://localhost:8000/calendar/";
                return;
            }
        }
    };
}