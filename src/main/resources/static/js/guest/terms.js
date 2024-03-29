window.addEventListener("DOMContentLoaded", (event) => {
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

function connect() {
    if (!!!window.EventSource) {
        alert('SSE를 지원하지 않는 브라우저 입니다.');
        return;
    }

    const source = new EventSource('/staff/connect');
    source.addEventListener('message', function(e) {
        console.log(e);
        if (e.data === "go agree") {
            window.location.href = '/guest/agree';
        }
    }, false);

    source.addEventListener('open', function(e) {
        console.log('open event');
    }, false);

    source.addEventListener('error', function(e) {
        console.log('error event');
        if (e.readyState === EventSource.CLOSED) {
            console.log('SSE 연결이 종료되었습니다.');
        }
    }, false);
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
