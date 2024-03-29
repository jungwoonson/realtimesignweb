function send() {
    fetch('/receiver/event', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: document.getElementById('message').value,
        }),
    })
        .then(response => {
            if (response.status === 204) {
                alert("전송되었습니다");
            }
        })
        .catch(error => {
            console.log(error);
        });
}