function connect() {
    if (!!!window.EventSource) {
        alert('SSE를 지원하지 않는 브라우저 입니다.');
        return;
    }

    const checkedElement = document.querySelector('input[type=radio]:checked');
    const source = new EventSource('/guest/connect/' + checkedElement.value);
    source.addEventListener('message', function(e) {
        const dataArray = e.data.split('|');

        if (dataArray[0] === 'go index') {
            fetch('/guest/staffKey', {
                method: 'POST',
                headers: {
                    "Data-Type": "json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    staffKey: dataArray[1],
                }),
            })
                .then(response => {
                    if (response.status === 204) {
                        window.location.href = '/guest/index';
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, false);

    source.addEventListener('open', function(e) {
        const deviceValue = checkedElement.value;
        document.getElementById('devices').remove();
        document.querySelector('body').innerText = deviceValue + ' 대기중...';
    }, false);

    source.addEventListener('error', function(e) {
        console.log('error event');
        if (e.readyState === EventSource.CLOSED) {
            console.log('SSE 연결이 종료되었습니다.');
            return;
        }
    }, false);
}
