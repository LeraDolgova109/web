$(document).ready(function (){
    LoadNavbar(window.localStorage.getItem('TOKEN'));
    LoadInfo(window.localStorage.getItem('TOKEN'));
});

function LoadInfo(token){
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return fetch('https://react-midterm.kreosoft.space/api/account/profile', {
      method: 'GET',
      headers: myHeaders,
    })
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let block = $('#card-template');
        block.find(".username").text(json.nickName);
        block.find(".inputAddress").attr("value", json.email);
        if (json.avatarLink != null){
            block.find(".inputUserpic").attr("src", json.avatarLink);
            block.find(".inputAvatarLink").attr("value", json.avatarLink);
        }
        block.find(".inputFIO").attr("value", json.name);
        block.find(".inputBirthDay").attr("placeholder", getFormattedDate(json.birthDate));
        document.getElementById("inputGender").selectedIndex = json.gender;
        document.getElementById("inputBirthDay").value = getFormattedDate(json.birthDate);
    });
}


function LoadNavbar(token){
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    
    fetch('https://react-midterm.kreosoft.space/api/account/profile', {
      method: 'GET',
      headers: myHeaders,
    }) 
    .then((res) => {
        if (res.status == 401) {
            alert("Сессия авторизации истекла");
            window.localStorage.setItem("TOKEN", null);
            window.location.href = "/login-autorisation-page/autorisationpage.html";
        }
        return res;
    })
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let template = $('#navbar-changed');
        let block = template.clone();
        block.find(".favourite-films").text("Избранное");
        block.find(".myprofile").text("Мой профиль");

        block.find(".item1").text("Авторизован как - " + json.nickName);
        window.localStorage.setItem("ID", json.id);
        block.find(".item2").text("Выйти");
        block.find(".item2").attr("id", "logout");
        block.removeClass("d-none");
        $("#navbar-container").append(block);
        var logoutButton = document.getElementById("logout");
        logoutButton.addEventListener("click", function(event){
            window.localStorage.setItem('TOKEN', "null");
            window.localStorage.setItem("ID", "null");
            window.localStorage.setItem('PAGE_NUMBER', 1);
            window.location.href = "/start-page/startpage.html";
        });
    });
}

