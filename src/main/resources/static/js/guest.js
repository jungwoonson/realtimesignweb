window.addEventListener("DOMContentLoaded", (event) => {
    connect();
});

function connect() {
    if (!!!window.EventSource) {
        alert('SSE를 지원하지 않는 브라우저 입니다.');
        return;
    }

    const source = new EventSource('/guest/connect');
    source.addEventListener('message', function(e) {
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
