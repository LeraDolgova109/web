var id_movie = window.localStorage.getItem('SELECTED_MOVIE').substring(6, window.localStorage.getItem('SELECTED_MOVIE').length);
var token = window.localStorage.getItem('TOKEN');

$(document).ready(function (){
    LoadNavbar();
    LoadDetails(id_movie);
    LoadReviews(id_movie);
});

function LoadNavbar(){
    if(window.localStorage.getItem('TOKEN') != "null"){
        FindNickName(window.localStorage.getItem('TOKEN'));
        regUserFunc();
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
        document.getElementById("fav-button").classList.add("d-none");
        document.getElementById("review-form").classList.add("d-none");
    }
}

function LoadDetails(id_film){
    fetch("https://react-midterm.kreosoft.space/api/movies/details/" + id_film)
    .then((response) => {
        return response.json();
    })
    .then((movie) => {
        let block = $('#movie-detail');
        block.find(".movie-name").text(movie.name + " (" + movie.year + ") ");
        block.find(".movie-poster").attr("src", movie.poster);
        block.find(".year").text(movie.year);
        var textGenres = "";
        for (let genre of movie.genres){
            textGenres += genre.name + ", ";
        }
        block.find(".country").text(movie.country);
        block.find(".genre").text(textGenres.substring(0, textGenres.length-2));
        textGenres = "";
        block.find(".time").text(movie.time + " мин.");
        if (movie.tagline != "-"){
            block.find(".tagline").text("«" + movie.tagline + "»");
        }
        else {
            block.find(".taglineField").addClass("d-none");
        }
        block.find(".description").text(movie.description);
        block.find(".director").text(movie.director);
        if (movie.budget != null){
            block.find(".budget").text("$" + movie.budget);
        }
        else {
            block.find(".budgetField").addClass("d-none");
        }
        if (movie.fees != null){
            block.find(".fees").text("$" + movie.fees);
        }
        else {
            block.find(".feesField").addClass("d-none");
        }
        block.find(".ageLimit").text(movie.ageLimit + "+");
        }
    );
}

function LoadReviews(id_film){
    fetch("https://react-midterm.kreosoft.space/api/movies/details/" + id_film)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        for (let review of json.reviews){
            if (review.author != null){
                if(review.author.userId == window.localStorage.getItem("ID")){
                    continue;
                }
            }
            var template = $('#review-template');
            let block = template.clone();
            block.attr("id", "review-" + review.id);
            block.find(".review-text").text(review.reviewText);
            block.find(".point").text(review.rating);
            if (review.rating > 5){
                block.addClass("border-success");
                block.find(".review-text").addClass("text-success");
                block.find(".point").addClass("bg-success");
            }
            else {
                block.addClass("border-danger");
                block.find(".review-text").addClass("text-danger");
                block.find(".point").addClass("bg-danger");
            }
            block.find(".date").text("Дата отзыва: " + getFormattedDate(review.createDateTime));
            if (!review.isAnonymous && review.author != null){
                block.find(".name").attr("id", review.author.userId);
                block.find(".name").text(review.author.nickName);
                if (review.author.avatar != null && review.author.avatar != ""){
                    block.find(".userpic").attr("src", review.author.avatar);
                }
            }
            
            block.removeClass("d-none");
            $("#reviews-container").append(block);
        }
        }
    );
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
    .then((res) => {
        if (res.status == 401) {
            alert("Сессия авторизации истекла");
            window.localStorage.setItem('TOKEN', "null");
            window.localStorage.setItem("PAGE_NUMBER", 1);
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
        window.localStorage.setItem("ID", json.id);
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
            location.reload();
        });
    });
}

function getFormattedDate(datetime) {
    var date = new Date(datetime);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return day + '.' + month + '.' + year;
}

function regUserFunc(){
    if(window.localStorage.getItem('TOKEN') != "null"){
        isFavourite(token);
        FindReview(id_movie);
    }
}


function isFavourite(token){
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
        for (movie of json.movies){
            if (id_movie == movie.id){
                document.getElementById("fav-button").classList.add("d-none");
                break;
            }
        }
    });
}

function FindReview(id_film){
    fetch("https://react-midterm.kreosoft.space/api/movies/details/" + id_film)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        for (let review of json.reviews){
            if (review.author != null){
                if(review.author.userId == window.localStorage.getItem("ID")){
                    document.getElementById("review-form").classList.add("d-none");
                    var block = $('#myreview-template'); 
                    block.attr("id", "review-" + review.id);
                    window.localStorage.setItem("REVIEW_ID", review.id);
                    block.find(".review-text").text(review.reviewText);
                    block.find(".point").text(review.rating);
                    if (review.rating > 5){
                        block.addClass("border-success");
                        block.find(".review-text").addClass("text-success");
                        block.find(".point").addClass("bg-success ");
                    }
                    else {
                        block.addClass("border-danger");
                        block.find(".review-text").addClass("text-danger");
                        block.find(".point").addClass("bg-danger");
                    }
                    block.find(".date").text("Дата отзыва: " + getFormattedDate(review.createDateTime));
                    if (!review.isAnonymous && review.author != null){
                        block.find(".name").attr("id", review.author.userId);
                        block.find(".name").text(review.author.nickName + " (Мой отзыв)");
                        if (review.author.avatar != null && review.author.avatar != ""){
                            block.find(".userpic").attr("src", review.author.avatar);
                        }
                    }
                    block.removeClass("d-none");
                    break;
                }
                else {
                    
                }
            }
        }
    }
    );
}

