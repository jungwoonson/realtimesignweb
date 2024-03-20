function showToast(message) {
    var toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "wb-toast";
    document.body.appendChild(toast);

    // 게이지 바 컨테이너 생성 및 추가
    var progressContainer = document.createElement("div");
    progressContainer.className = "wb-toast-progress-container";
    toast.appendChild(progressContainer);

    // 게이지 바 생성 및 추가
    var progressBar = document.createElement("div");
    progressBar.className = "wb-toast-progress";
    progressContainer.appendChild(progressBar);

    // 토스트 메시지 보여주기
    setTimeout(function() {
        toast.classList.add("show");
        progressBar.style.width = "100%"; // 게이지 바 시작
    }, 100);

    // 일정 시간 후 토스트 메시지 제거
    setTimeout(function() {
        toast.classList.remove("show");
        setTimeout(function() {
            document.body.removeChild(toast);
        }, 500); // 투명해지는 동안 기다림
    }, 3000); // 3초 동안 표시
}
