window.addEventListener("DOMContentLoaded", (event) => {
    sseConnect();
});

function sseConnect() {
    if (!!!window.EventSource) {
        alert('EventSource를 지원하지 않는 브라우저 입니다.');
        return;
    }

    const source = new EventSource("/receiver/connect");
    source.addEventListener('message', function(e) {
        if (e.data.startsWith("key")) {
            return;
        }

        const res = JSON.parse(e.data);

        if (res.id === 'event') {
            showToast(res.message);

            const li = document.createElement('li');
            li.innerText = res.message;
            document.getElementById('notification-list').insertAdjacentElement('afterbegin', li);
        }

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