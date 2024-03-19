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
        if (e.data === 'refresh guest') {
            findGuests();
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

        const guests = JSON.parse(xhr.response);
        const tbodyList = document.getElementById('guest-list');
        tbodyList.innerHTML = '';

        if (!!!guests.length) {
            tbodyList.innerHTML = '<tr><td colspan="3">기기 접속 대기 중...</td></tr>';
            return;
        }

        for (let i = 0; i < guests.length; i++) {
            const td1 = document.createElement('td');
            td1.innerHTML = i + 1;

            const td2 = document.createElement('td');
            td2.innerHTML = guests[i];

            const button = document.createElement('button');
            button.innerHTML = '선택';
            button.type = 'button';
            button.onclick = choiceGuest;

            const td3 = document.createElement('td');
            td3.insertAdjacentElement('beforeend', button);

            const tr = document.createElement('tr');
            tr.insertAdjacentElement('beforeend', td1);
            tr.insertAdjacentElement('beforeend', td2);
            tr.insertAdjacentElement('beforeend', td3);

            tbodyList.insertAdjacentElement('beforeend', tr);
        }
    }

    xhr.open('GET', url);
    xhr.send();
}

function choiceGuest() {

}