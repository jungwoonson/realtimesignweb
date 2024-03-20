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
        }

        console.log(res);
        console.log(res.id === 'sign');
        console.log(res.id);

        if (res.id === 'sign') {
            const img = document.getElementById('modalSignImage');
            img.src = res.value;
            return;
        }

        if (!!res.id) {
            let element = document.getElementById(res.id);
            element.checked = res.checked === 'true';
            element.focus();
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
