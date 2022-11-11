favButton = document.getElementById("fav-button");
var id_movie = window.localStorage.getItem('SELECTED_MOVIE').substring(6, window.localStorage.getItem('SELECTED_MOVIE').length);
var token = window.localStorage.getItem('TOKEN');

favButton.addEventListener("click", function(){
    fetch('https://react-midterm.kreosoft.space/api/favorites/' + id_movie + '/add', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            
        }),
    })
    .then((response) => {
        document.getElementById("fav-button").classList.add("d-none");
    })
})
