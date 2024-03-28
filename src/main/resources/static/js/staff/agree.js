window.addEventListener("DOMContentLoaded", (event) => {
    sseConnect('/staff/connect', sseMessageEvent);
});

function sseMessageEvent(e) {
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

    if (res.id === 'sign') {
        const img = document.getElementById('modalSignImage');
        img.src = res.value;
        return;
    }

    if (res.id === 'saveAgree') {
        window.location.href = '/staff/signs';
        return;
    }

    if (!!res.id) {
        let element = document.getElementById(res.id);
        element.checked = res.checked === 'true';
        element.focus();
    }
}

let signModal;
window.addEventListener("DOMContentLoaded", (event) => {
    signModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false,
    });
    document.getElementById('exampleModal').addEventListener('hide.bs.modal', (e) => {
        closeSignModal();
    });
});

function openSignModal() {
    fetch('/staff/terms/event', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: 'signModal',
            value: 'open',
        }),
    })
        .then(response => {
            if (response.status === 204) {
                signModal.show();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function closeSignModal() {
    fetch('/staff/terms/event', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: 'signModal',
            value: 'close',
        }),
    })
        .then(response => {
            if (response.status === 204) {
                signModal.hide();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function onClear() {
    fetch('/staff/terms/event', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: 'signModal',
            value: 'clear',
        }),
    })
        .catch(error => {
            console.log(error);
        });
}

function saveSign(isSendServer) {
    const modalSignImage = document.getElementById('modalSignImage');
    const signImage = document.getElementById('signImage');
    signImage.src = modalSignImage.src;
    closeSignModal();
    if (isSendServer) {
        fetch('/staff/terms/event', {
            method: 'POST',
            headers: {
                "Data-Type": "json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: 'signModal',
                value: 'save',
            }),
        })
            .then(response => {
                if (response.status === 204) {
                    signModal.hide();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function saveAgree() {
    const check1 = document.getElementById('agree8-1');
    const check2 = document.getElementById('agree8-2');
    const signImage = document.getElementById('signImage');

    if (!check1.checked || !check2.checked) {
        showToast('필수 항목을 동의해 주세요.');
        if (!check1.checked) {
            check1.focus();
            return;
        }
        if (!check2.checked) {
            check2.focus();
            return;
        }
        return;
    }

    if (calByte.getByteLength(signImage.src) < 1200) {
        showToast('서명란을 클릭하여 서명해 주세요.');
        return;
    }

    fetch('/staff/terms/event', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: 'saveAgree',
        }),
    })
        .catch(error => {
            console.log(error);
        });
}