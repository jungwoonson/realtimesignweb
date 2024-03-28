window.addEventListener("DOMContentLoaded", (event) => {
    sseConnect('/staff/connect', sseMessageEvent);
});

function sseMessageEvent(e) {
    if (e.data === 'go agree') {
        window.location.href = '/staff/agree';
    }

    const res = JSON.parse(e.data);
    if (!!res.id) {
        let element = document.querySelector(`input[type=radio][name=${res.id}][value=${res.value}]`);
        element.checked = true;
        element.focus();
    }
}

function goAgree() {
    fetch('/staff/goagree', {
        method: 'GET',
    })
        .then(response => {
            if (response.status === 204) {
                window.location.href = '/staff/agree';
            }
        })
        .catch(error => {
            console.log(error);
        });
}
