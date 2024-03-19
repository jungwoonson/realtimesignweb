window.addEventListener("DOMContentLoaded", (event) => {
    connect();
});

function connect() {
    if (!!!window.EventSource) {
        alert('SSE를 지원하지 않는 브라우저 입니다.');
        return;
    }

    const source = new EventSource('/staff/connect');
    source.addEventListener('message', function(e) {
        const res = JSON.parse(e.data);
        let element = document.querySelector(`input[type=radio][name=${res.id}][value=${res.value}]`);
        element.checked = true;
        element.focus();
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