// Google Apps Script 웹앱 URL을 여기에 입력하세요
// 배포 후 URL을 복사해서 여기에 붙여넣으세요
const APPS_SCRIPT_ID = "AKfycbziXPZTsyar-ZdfGNk9PhaIM77ju8ReGc9PFZxWtOgb50rJKTH8BMOPB-jxvOS2WxPs";
const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxlg4WT3ZcXKj15JxViYscgXfEuLweJYCHtkr8LCmbwhNEK3ktvtFXtAZvgKQg94vOtpQ/exec";
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const password = document.getElementById("password").value;
    const submitBtn = document.getElementById("submitBtn");
    const messageDiv = document.getElementById("message");

    // 메시지 초기화
    messageDiv.className = "message";
    messageDiv.textContent = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "확인 중...";

    try {
        // Google Apps Script 웹앱 CORS 문제 해결: GET 요청 사용
        const url =
            APPS_SCRIPT_URL +
            "?studentId=" +
            encodeURIComponent(studentId) +
            "&password=" +
            encodeURIComponent(password);

        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
        });

        const data = await response.json();

        if (data.success) {
            // 성공 시 링크 반환
            if (data.link) {
                showMessage("로그인 성공! 링크로 이동합니다...", "success");
                setTimeout(() => {
                    window.location.href = data.link;
                }, 1000);
            } else {
                showMessage("로그인 성공!", "success");
            }
        } else {
            // 실패 시 에러 메시지 표시
            showMessage(data.message || "비밀번호가 틀렸습니다.", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showMessage("서버 연결 오류가 발생했습니다. 나중에 다시 시도해주세요.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "확인";
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
}
