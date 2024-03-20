window.addEventListener("DOMContentLoaded", (event) => {
    getSigns();
});

function getSigns() {
    const xhr = new XMLHttpRequest();
    const url = '/staff/signinfos';

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        if (xhr.status !== 200) {
            return;
        }

        console.log(xhr.response);
        const sign = JSON.parse(xhr.response);
        console.sign(sign);
        const tbodyList = document.getElementById('guest-list');
        tbodyList.innerHTML = '';

        if (!!!sign.length) {
            tbodyList.innerHTML = '<tr><td colspan="8">조회된 목록이 없습니다.</td></tr>';
            return;
        }

        for (let i = 0; i < sign.length; i++) {
            const td1 = document.createElement('td');
            td1.innerHTML = i + 1;

            const td2 = document.createElement('td');
            td2.innerHTML = sign[i];

            const td3 = document.createElement('td');
            td2.innerHTML = sign[i];

            const td4 = document.createElement('td');
            td2.innerHTML = sign[i];

            const td5 = document.createElement('td');
            td2.innerHTML = sign[i];

            const td6 = document.createElement('td');
            td2.innerHTML = sign[i];

            const td7 = document.createElement('td');
            td2.innerHTML = sign[i];

            const td8 = document.createElement('td');
            td2.innerHTML = sign[i];

            const img = document.createElement('img');
            img.src = '';

            const tr = document.createElement('tr');
            tr.insertAdjacentElement('beforeend', td1);
            tr.insertAdjacentElement('beforeend', td2);
            tr.insertAdjacentElement('beforeend', td3);
            tr.insertAdjacentElement('beforeend', td4);
            tr.insertAdjacentElement('beforeend', td5);
            tr.insertAdjacentElement('beforeend', td6);
            tr.insertAdjacentElement('beforeend', td7);
            tr.insertAdjacentElement('beforeend', td8);

            tbodyList.insertAdjacentElement('beforeend', tr);
        }
    }

    xhr.open('GET', url);
    xhr.send();
}