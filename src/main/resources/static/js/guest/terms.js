window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll('input[type=radio]').forEach(e => {
        e.onclick = (e) => {
            radioEvent(e.target.name, e.target.value);
        }
    });

    sseConnect('/guest/reconnect', sseMessageEvent);
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

function sseMessageEvent(e) {
    if (e.data === "go agree") {
        window.location.href = '/guest/agree';
    }
}

function goAgree() {
    fetch('/guest/goagree', {
        method: 'GET',
    })
        .then(response => {
            if (response.status === 204) {
                window.location.href = '/guest/agree';
            }
        })
        .catch(error => {
            console.log(error);
        });
}
