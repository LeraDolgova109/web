function deleteFav(){
    var id_movie = window.localStorage.getItem('SELECTED_MOVIE').substring(6, window.localStorage.getItem('SELECTED_MOVIE').length);
    var token = window.localStorage.getItem('TOKEN');
    fetch('https://react-midterm.kreosoft.space/api/favorites/' + id_movie + '/delete', {
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
}