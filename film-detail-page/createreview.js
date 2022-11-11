reviewButton = document.getElementById("review-button");
var id_movie = window.localStorage.getItem('SELECTED_MOVIE').substring(6, window.localStorage.getItem('SELECTED_MOVIE').length);

reviewButton.addEventListener("click", function(){
fetch('https://react-midterm.kreosoft.space/api/movie/' + id_movie + '/review/add', {
        method: 'POST',
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
        location.reload();
    })
})



