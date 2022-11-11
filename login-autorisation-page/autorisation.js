var aurotisButton = document.getElementById("autorisationButton");


aurotisButton.addEventListener("click", function(event){
    $.ajax({
        type: 'POST',
        url: 'https://react-midterm.kreosoft.space/api/account/login',
        crossDomain: true,
        contentType:'application/json',
        data: JSON.stringify({
            "username": document.getElementById("inputLogin").value,
                "password": document.getElementById("inputPassword").value
        }),
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) {
            console.log(responseData);
            window.localStorage.setItem('TOKEN', responseData.token);
            window.location.href = "/start-page/startpage.html";
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log(responseData);
            document.getElementById("errorMessage").textContent = "Неправильный Логин или Пароль";
            //document.getElementById("errorMessage").textContent = "Пользователь не зарегестрирован";
    }});
    
});

var regButton = document.getElementById("registrationButton");

regButton.addEventListener("click", function(event){
    window.location.href = "loginpage.html";
});


