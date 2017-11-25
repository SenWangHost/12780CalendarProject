function test() {
    alert("The link is successful!");
}

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
    console.log(email);
    console.log(password);
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
}

function login() {
    alert("This is the login function!");
    if (!validateInput()) {
        return;
    }
    // send ajax request for validating the user input to django 
}