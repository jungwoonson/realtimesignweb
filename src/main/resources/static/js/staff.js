window.addEventListener("DOMContentLoaded", (event) => {
    findGuests();
    connect();
});

function connect() {
    if (!!!window.EventSource) {
        alert('SSE를 지원하지 않는 브라우저 입니다.');
        return;
    }

    const source = new EventSource('/staff/connect');
    source.addEventListener('message', function(e) {
        findGuests();
    }, false);

    source.addEventListener('open', function(e) {
        console.log('open event');
    }, false);

    source.addEventListener('error', function(e) {
        console.log('error event');
        if (e.readyState === EventSource.CLOSED) {
            console.log('SSE 연결이 종료되었습니다.');
            return;
        }
    }, false);
}

function findGuests() {
    const xhr = new XMLHttpRequest();
    const url = '/staff/guests';

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        if (xhr.status !== 200) {
            return;
        }

        console.log(xhr.response);
    }

    xhr.open('GET', url);
    xhr.send();
}