let canvas, context, tool;

window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll('input[type=checkbox]').forEach(e => {
        e.onchange = (e) => {
            checkboxEvent(e.target.name, e.target.checked);
        }
    });

    sseConnect('/guest/reconnect', sseMessageEvent);
    window.addEventListener('load', InitEvent, false);
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

function sseMessageEvent(e) {
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

    if (res.id === 'saveAgree') {
        saveAgree();
        return;
    }
}

function InitEvent() {
    canvas = document.getElementById('canvas');
    if (!canvas) {
        alert("캔버스 객체를 찾을 수 없음");
        return;
    }
    if (!canvas.getContext) {
        alert("Drawing Contextf를 찾을 수 없음");
        return;
    }
    context = canvas.getContext('2d');
    if (!context) {
        alert("getContext() 함수를 호출 할 수 없음");
        return;
    }
    // Pencil tool 객체를 생성 한다.
    tool = new tool_pencil();
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup', ev_canvas, false);
    canvas.addEventListener('touchstart', ev_canvas, false);
    canvas.addEventListener('touchmove', ev_canvas, false);
    canvas.addEventListener('touchend', ev_canvas, false);
}

function tool_pencil() {
    var tool = this;
    this.started = false;

    // 마우스를 누르는 순간 그리기 작업을 시작 한다.
    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };
    // 마우스가 이동하는 동안 계속 호출하여 Canvas에 Line을 그려 나간다
    this.mousemove = function (ev) {
        if (tool.started) {
            context.lineTo(ev._x, ev._y);
            context.stroke();
        }
    };
    // 마우스 떼면 그리기 작업을 중단한다
    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            sendSignData();
        }
    };

    // 마우스를 누르는 순간 그리기 작업을 시작 한다.
    this.touchstart = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };
    // 마우스가 이동하는 동안 계속 호출하여 Canvas에 Line을 그려 나간다
    this.touchmove = function (ev) {
        if (tool.started) {
            context.lineTo(ev._x, ev._y);
            context.stroke();
        }
    };
    // 마우스 떼면 그리기 작업을 중단한다
    this.touchend = function (ev) {
        if (tool.started) {
            tool.touchmove(ev);
            tool.started = false;
            sendSignData();
        }
    };
}

// Canvas요소 내의 좌표를 결정 한다.
function ev_canvas(ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox 브라우저
        ev._x = ev.layerX;
        ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera 브라우저
        ev._x = ev.offsetX;
        ev._y = ev.offsetY;
    } else if (ev.targetTouches[0] || ev.targetTouches[0].pageX == 0) {	//핸드폰
        var left = 0;
        var top = 0;
        var elem = document.getElementById('canvas');

        while (elem) {
            left = left + parseInt(elem.offsetLeft);
            top = top + parseInt(elem.offsetTop);
            elem = elem.offsetParent;
        }

        ev._x = ev.targetTouches[0].pageX - left;
        ev._y = ev.targetTouches[0].pageY - top;
    }
    // tool의 이벤트 핸들러를 호출한다.
    var func = tool[ev.type];
    if (func) {
        func(ev);
    }
}

function onClear() {
    canvas = document.getElementById('canvas');
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    sendSignData();
}

function sendSignData() {
    fetch('/guest/terms/event', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: 'sign',
            value: canvas.toDataURL(),
        }),
    })
        .catch(error => {
            console.log(error);
        });
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
    fetch('/guest/terms/event', {
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
    fetch('/guest/terms/event', {
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

function saveSign(isSendServer) {
    const signImage = document.getElementById('signImage');
    signImage.src = canvas.toDataURL();
    closeSignModal();
    if (isSendServer) {
        fetch('/guest/terms/event', {
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
    const check3 = document.getElementById('agree8-3');
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
        showToast('서명란을 터치하여 서명해 주세요.');
        return;
    }

    fetch('/guest/terms/save', {
        method: 'POST',
        headers: {
            "Data-Type": "json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: 'saveAgree',
            name: '김인재',
            phoneNumber: '010-0000-0000',
            check1: check1.checked,
            check2: check2.checked,
            check3: check3.checked,
            sign: signImage.src,
        }),
    })
        .then(response => {
            if (response.status === 204) {
                alert('저장이 완료되었습니다.');
                window.location.href = '/guest';
            }
        })
        .catch(error => {
            console.log(error);
        });
}
