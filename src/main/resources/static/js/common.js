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

const calByte = {
    getByteLength : function( string ) {

        if( string == null || string.length == 0 ) {
            return 0;
        }

        let size = 0;

        for( let num = 0; num < string.length; num++ ) {
            size += this.charByteSize( string.charAt( num ) );
        }

        return size;
    }
    , cutByteLength : function( string, length ) {

        if( string == null || string.length == 0 ) {
            return 0;
        }

        let size = 0;
        let rIndex = string.length;


        for( let num = 0; num < string.length; num++ ) {

            size += this.charByteSize( string.charAt( num ) );

            if( size == length ) {
                rIndex = num + 1;
                break;
            } else if( size > length ) {
                rIndex = num;
                break;
            }
        }
        return string.substring( 0, rIndex );
    }
    , charByteSize : function( ch ) {

        if( ch == null || ch.length == 0 ) {
            return 0;
        }

        let charCode = ch.charCodeAt( 0 );

        if( charCode <= 0x00007F ) {
            return 1;
        } else if( charCode <= 0x0007FF ) {
            return 2;
        } else if( charCode <= 0x00FFFF ) {
            return 3;
        } else {
            return 4;
        }
    }
};

function sseConnect(url, messageEvent) {
    if (!!!window.EventSource) {
        alert('EventSource를 지원하지 않는 브라우저 입니다.');
        return;
    }

    const source = new EventSource(url);
    source.addEventListener('message', function(e) {
        messageEvent(e);
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
