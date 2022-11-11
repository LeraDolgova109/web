var id_movie = window.localStorage.getItem('SELECTED_MOVIE').substring(6, window.localStorage.getItem('SELECTED_MOVIE').length);
var token = window.localStorage.getItem('TOKEN');
var id_review =  window.localStorage.getItem("REVIEW_ID");

var buttonChange = document.getElementById("changeReview");

buttonChange.addEventListener("click", function(event){
    document.getElementById("review-form").classList.remove("d-none");
    document.getElementById("review-" +  window.localStorage.getItem("REVIEW_ID")).classList.add("d-none");
    document.getElementById("change-review").classList.remove("d-none");
    document.getElementById("review-button").classList.add("d-none");
    fetch("https://react-midterm.kreosoft.space/api/movies/details/" + id_movie)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        for (let review of json.reviews){
            if (review.author != null){
                if(review.author.userId == window.localStorage.getItem("ID")){
                    document.getElementById("newreview-text").value = review.reviewText;
                    document.getElementById("newreview-raiting").value = Number(review.rating);
                    document.getElementById("flexCheckDefault").value = Boolean(review.isAnonymous);
                    break;
                }
                else {
                    
                }
            }
        }
    }
    );
    changeButton = document.getElementById("change-review");

    changeButton.addEventListener("click", function(event){
    fetch('https://react-midterm.kreosoft.space/api/movie/' + id_movie + '/review/' + id_review + '/edit', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "reviewText": document.getElementById("newreview-text").value,
            "rating": Number(document.getElementById("newreview-raiting").value),
            "isAnonymous": Boolean(document.getElementById("flexCheckDefault").value)
        }),
    })
    .then((response) => {
        console.log(response);

    })
});
});

var buttonDelete = document.getElementById("deleteRewview");

buttonDelete.addEventListener("click", function(event){
    fetch('https://react-midterm.kreosoft.space/api/movie/' + id_movie + '/review/' + id_review + '/delete', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            
        }),
    })
    .then((response) => {
        console.log(response.statusText);
        location.reload();
    })
});

