window.addEventListener("DOMContentLoaded", (event) => {
    findGuests();
    sseConnect('/staff/connect', sseMessageEvent);
});

function sseMessageEvent(e) {
    if (e.data === 'refresh guest') {
        findGuests();
    }
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
            button.style = 'width: 80px; height: 50px;';
            button.type = 'button';
            button.onclick = () => {
                choiceGuest(guests[i]);
            }

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

function choiceGuest(value) {
    const xhr = new XMLHttpRequest();
    const url = '/staff/choice?guest=' + value;

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        if (xhr.status !== 204) {
            return;
        }

        window.location.href = '/staff/index'
    }

    xhr.open('GET', url);
    xhr.send();
}