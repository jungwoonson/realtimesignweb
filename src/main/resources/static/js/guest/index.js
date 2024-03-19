function goTerms() {
    fetch('/guest/goterms', {
        method: 'GET',
    })
        .then(response => {
            if (response.status === 204) {
                window.location.href = '/guest/terms';
            }
        })
        .catch(error => {
            console.log(error);
        });
}