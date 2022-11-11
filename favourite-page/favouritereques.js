$(document).ready(function (){
    LoadMovies(window.localStorage.getItem('TOKEN'));
    LoadNavbar();
});


function LoadNavbar(){
    if(window.localStorage.getItem('TOKEN') != "null"){
        FindNickName(window.localStorage.getItem('TOKEN'));
    }
    else{
        let template = $('#navbar-changed');
        let block = template.clone();
        block.find(".item1").text("Войти");
        block.find(".item1").attr("href", "/login-autorisation-page/autorisationpage.html");
        block.find(".item2").text("Регистрация");
        block.find(".item2").attr("href", "/login-autorisation-page/loginpage.html");
        block.removeClass("d-none");
        $("#navbar-container").append(block);
    }
}


function LoadMovies(token){
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });

    return fetch('https://react-midterm.kreosoft.space/api/favorites/', {
      method: 'GET',
      headers: myHeaders,
    })
    
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        $("#movies-container").empty();
        if (Object.keys(json.movies).length != 0){
            let template = $('#card-template');
            for(let movie of json.movies){
                let block = template.clone();
                block.attr("id", "movie-" + movie.id);
                block.find(".movie-name").text(movie.name);
                block.find(".movie-poster").attr("src", movie.poster);
                block.find(".movie-year").text(movie.year);
                var textGenres = "";
                for (let genre of movie.genres){
                    textGenres += genre.name + ", ";
                }
                block.find(".movie-country-genres").text(movie.country + " ◦ " + textGenres.substring(0, textGenres.length-2));
                textGenres = "";
                var ratingCount = 0;
                var reviewsCount = 0;
                for (let review of movie.reviews){
                    ratingCount += review.rating;
                    reviewsCount += 1;
                }
                if (reviewsCount > 0){
                    block.find(".movie-reviews").text("Средняя оценка - " + Math.round((ratingCount/reviewsCount) * 10) / 10);
                }
                else {
                    block.find(".movie-reviews").text("Оценок нет");
                }
                ratingCount = 0;
                reviewsCount = 0;
                block.removeClass("d-none");
                deleteButton = document.getElementById("delete");
                deleteButton.addEventListener("click", () =>{
                    console.log(true);
                })
                $("#movies-container").append(block);
                
            }
        }
        else {
            document.getElementById("error-text").classList.remove("d-none");
        }
    });
}

function FindNickName(token){
    const myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    
    fetch('https://react-midterm.kreosoft.space/api/account/profile', {
      method: 'GET',
      headers: myHeaders,
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
