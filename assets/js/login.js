const loginBtn = document.querySelector('form button');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal button');

const validEmpty = (userId, userPw) => {
  if(userId.value === "" || userPw.value === "") {
    modal.style.display = "flex";
    modal.childNodes[1].innerText = "Please enter your ID or password.";
    modalBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });
  } else {  // 사용자가 정보를 모두 입력했을 경우 index.html 페이지로 이동한다.
    location.href = "../main.html";
    modal.style.display = "none";
  }
}

// 사용자가 로그인 버튼을 클릭했을 때 사용자의 정보를 확인하는 기능이다.
const handleLoginBtn = () => {
  const userId = document.querySelector('input[name="userId"]');
  const userPw = document.querySelector('input[name="userPw"]');
  // 사용자가 정보를 하나라도 입력하지 않을 경우 오류관련 모달을 출력한다.
  validEmpty(userId, userPw);
}

loginBtn.addEventListener('click', handleLoginBtn);
