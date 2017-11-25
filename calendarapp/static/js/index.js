function test() {
    alert("The link is successful!");
}

// the helper function to validate the email format.
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateInput() {
    // clean the error field after each validation
    document.getElementById("errorField").innerHTML = "";
    var errorMessageF = "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
    var errorMessageB = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    var email = document.getElementById("InputEmail").value;
    var password = document.getElementById("InputPassword").value;
    var message = "";
    // console.log(email);
    // console.log(password);
    if (email == null || email == "") {
        message = errorMessageF + "Your Input Email Address cannot be empty!" + errorMessageB;
        document.getElementById("errorField").innerHTML = message;
        return false;
    }
    if (password == null || password == "") {
        message = errorMessageF + "Your Input Password cannot be empty!" + errorMessageB;
        document.getElementById("errorField").innerHTML = message;
        return false;
    }
    if (!validateEmail(email)) {
        message = errorMessageF + "Your Input Email Address is not valid!" + errorMessageB;
        document.getElementById("errorField").innerHTML = message;
        return false;
    }
    return true;
}

function setErrorField(message) {
    // clean the error field after each validation
    document.getElementById("errorField").innerHTML = "";
    var errorMessageF = "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
    var errorMessageB = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    document.getElementById("errorField").innerHTML = errorMessageF + message + errorMessageB;
}

function login() {
    // alert("This is the login function!");
    if (!validateInput()) {
        return;
    }
    // send ajax request to the django for validating user information
    // using jQuery to get csrf token
    var email = document.getElementById("InputEmail").value;
    var password = document.getElementById("InputPassword").value;
    var xhttp = new XMLHttpRequest();
    var params = "email=" + email + "&" + "password=" + password;
    xhttp.open("POST", "http://localhost:8000/checkUser/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    // get the http response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText == "Email not exist") {
                setErrorField("Input Email address doesn't exist");
                return;
            }
            if (this.responseText == "Incorrect Password") {
                setErrorField("Input Password is not correct");
                return;
            }
            if (this.responseText == "true") {
                window.location.href = "http://localhost:8000/homepage/";
                return;
            }
        }
    };
}