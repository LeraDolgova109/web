var button = document.getElementById("registrationButton");
var canLogin1 = true;
var canLogin2 = true;
var currentdate = new Date();
var datetime = getFormattedDate(currentdate);

function Checker(){
    document.getElementById("errorMessage").textContent = "";
    if (document.getElementById("inputPassword").value != document.getElementById("inputProfPassword").value){
        document.getElementById("errorMessage").textContent = "Пароли не совпадают\n";
        canLogin1 = false;
    }
    else {
        canLogin1 = true;
    }
    if (document.getElementById("inputBirthDay").value > datetime){
        document.getElementById("errorMessage").textContent += "Неправильная дата рождения";
        canLogin2 = false;
    }
    else {
        canLogin2 = true;
    }
}

button.addEventListener("click", function(event){
    Checker();
    if (canLogin1 && canLogin2){
        var date = new Date(document.getElementById("inputBirthDay").value);

        $.ajax({
            type: 'POST',
            url: 'https://react-midterm.kreosoft.space/api/account/register',
            crossDomain: true,
            contentType:'application/json',
            data: JSON.stringify({
                "userName": document.getElementById("inputLogin").value,
                "name": document.getElementById("inputFIO").value,
                "password": document.getElementById("inputPassword").value,
                "email": document.getElementById("inputAddress").value,
                "birthDate": date.toISOString(),
                "gender": document.getElementById("inputGender").selectedIndex
            }),
            dataType: 'json',
            success: function(responseData, textStatus, jqXHR) {
                console.log(responseData);
                window.localStorage.setItem('TOKEN', responseData.token);
                window.location.href = "/start-page/startpage.html";
            },
            error: function (responseData, textStatus, errorThrown) {
                document.getElementById("errorMessage").textContent = "Логин или Email уже занят"
        }});
    }
});

function getFormattedDate(datetime) {
    var date = new Date(datetime);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}