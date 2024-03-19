window.addEventListener("DOMContentLoaded", (event) => {
    console.log('load!!!');
    document.querySelectorAll('input[type=radio]').forEach(e => {
        e.onclick = (e) => {
            console.log(e.target.name);
            radioEvent(e.target.name, e.target.value);
        }
    });
});

function radioEvent(id, value) {
    console.log(id, value);
    fetch('/guest/terms/event', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id, value
        }),
    })
        .catch(error => {
            console.log(error);
        });
}