window.addEventListener("DOMContentLoaded", (event) => {
    sseConnect('/staff/connect', sseMessageEvent);
});

function sseMessageEvent(e) {
    if (e.data === "go terms") {
        window.location.href = '/staff/terms';
    }
}
