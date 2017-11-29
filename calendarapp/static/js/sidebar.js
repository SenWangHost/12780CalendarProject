function logout() {
    // alert("This is the log out function!");
    // send ajax request to delete the user information in the session
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:8000/logout/', false);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };

}