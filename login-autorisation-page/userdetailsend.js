var changeButton = document.getElementById("sendChange");
var token = localStorage.getItem('TOKEN');
var canLogin1 = true;
var canLogin2 = true;
var currentdate = new Date();
var datetime = getFormattedDate(currentdate);

function Checker(){
    document.getElementById("errorMessage").textContent = "";

    if (document.getElementById("inputAdress").value == "" || document.getElementById("inputFIO").value == ""){
        document.getElementById("errorMessage").textContent += "Поля Email и ФИО обязательны для заполнения\n";
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

function getFormattedDate(datetime) {
    var date = new Date(datetime);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

changeButton.addEventListener("click", function(event){
    Checker();
    if (canLogin1 && canLogin2){
        var date = new Date(document.getElementById("inputBirthDay").value);
        fetch("https://react-midterm.kreosoft.space/api/account/profile", {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "id": window.localStorage.getItem("ID"),
                "nickName": document.getElementById("username").value,
                "email": document.getElementById("inputAdress").value,
                "avatarLink": document.getElementById("inputAvatarLink").value,
                "name": document.getElementById("inputFIO").value,            
                "birthDate": date.toISOString(),
                "gender": document.getElementById("inputGender").selectedIndex
            }),
        })
        .then((response) => {
            console.log(response);
            location.reload();
        })
    }
});

