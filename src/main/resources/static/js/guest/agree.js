window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll('input[type=checkbox]').forEach(e => {
        e.onchange = (e) => {
            checkboxEvent(e.target.name, e.target.checked);
        }
    });

    connect();
});

function checkboxEvent(id, checked) {
    fetch('/guest/terms/event', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id, checked
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

    const source = new EventSource('/guest/reconnect');
    source.addEventListener('message', function(e) {

        if (!!!e.data) {
            return;
        }

        const res = JSON.parse(e.data);
        if (!!!res.id) {
            return;
        }

        if (res.id === 'signModal') {
            if (res.value === 'open') {
                signModal.show();
                return;
            }

            if (res.value === 'close') {
                signModal.hide();
                return;
            }

            if (res.value === 'save') {
                saveSign(false);
                return;
            }

            if (res.value === 'clear') {
                onClear();
                return;
            }
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
