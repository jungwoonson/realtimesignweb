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

        const sign = JSON.parse(xhr.response);
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
            td2.innerHTML = sign[i].name;

            const td3 = document.createElement('td');
            td3.innerHTML = sign[i].phoneNumber;

            const td4 = document.createElement('td');
            td4.innerHTML = sign[i].check1;

            const td5 = document.createElement('td');
            td5.innerHTML = sign[i].check2;

            const td6 = document.createElement('td');
            td6.innerHTML = sign[i].check3;

            const img = document.createElement('img');
            img.src = sign[i].sign;

            const td7 = document.createElement('td');
            td7.insertAdjacentElement('beforeend', img);

            const td8 = document.createElement('td');
            td8.innerHTML = sign[i].createDateTime;

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