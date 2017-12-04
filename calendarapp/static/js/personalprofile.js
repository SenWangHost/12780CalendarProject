function editButtonEffect() {
    document.getElementById("alteremailbu").onclick = function() {
        document.getElementById('alteremail').readOnly = false;
    };
    document.getElementById("firstnamebu").onclick = function() {
        document.getElementById('firstname').readOnly = false;
    };
    document.getElementById("lastnamebu").onclick = function() {
        document.getElementById('lastname').readOnly = false;
    };
    document.getElementById("mottobu").onclick = function() {
        document.getElementById('motto').readOnly = false;
    };
    document.getElementById("biobu").onclick = function() {
        document.getElementById('bio').readOnly = false;
    };
    document.getElementById("urlbu").onclick = function() {
        document.getElementById('url').readOnly = false;
    };
    document.getElementById("companybu").onclick = function() {
        document.getElementById('company').readOnly = false;
    };
}