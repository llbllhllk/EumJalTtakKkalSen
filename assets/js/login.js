// Element
const loginBtn = document.querySelector('form button');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal button');

/* 로그인 오류 관련 모달을 출력하는 기능이다. */
const handleModal = (text) => {
  modal.style.display = "flex";
  modal.childNodes[1].innerText = text;
  modalBtn.addEventListener('click', () => {
    modal.style.display = "none";
  });
}

/* 사용자가 로그인 버튼을 클릭했을 때 사용자의 정보를 확인하는 기능이다. */
const handleLoginBtn = () => {
  const userId = document.querySelector('input[name="userId"]');
  const userPw = document.querySelector('input[name="userPw"]');
  let text;
  /* 사용자가 정보를 모두 입력하지 않을 경우 오류 모달을 출력한다. */
  if(userId.value === "" || userPw.value === "") {
    text = "Please enter your ID or password.";
    handleModal(text);
  } else if(userId.value !== "" && userPw.value !== "") {
    /* 사용자가 정보를 모두 할 경우 일치하는 정보가 있으면 main.html로 이동하고 그렇지 않을 경우 오류 모달을 출력한다. */
    $.post(
      "../assets/php/login.php",
      {
        "userId": userId.value,
        "userPw": userPw.value,
      },
      (data, status, xhr) => {
        const jsonData = JSON.parse(data);
        if(jsonData.length === 0) {
          text = "No matching information found.";
          handleModal(text);
        } else {
          location.href = "../main.html";
        }
      }
    )
  }
}

loginBtn.addEventListener('click', handleLoginBtn);
