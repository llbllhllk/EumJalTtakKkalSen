// Element
const signUpBtn = document.querySelector('form button');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal button');

/* 로그인 오류 관련 모달을 출력하는 기능이다. */
const handleModal = (text, flag) => {
  modal.style.display = "flex";
  modal.childNodes[1].innerText = text;
  modalBtn.addEventListener('click', () => {
    if(flag === true) {
      modal.style.display = "none";
      location.href = "./login.html";
    } else {
      modal.style.display = "none";
    }
  });
}

// 사용자가 회원가입 버튼을 클릭했을 때 사용자의 정보를 확인하는 기능이다.
const handleSignUpBtn = () => {
  const userName = document.querySelector('input[name="userName"]');
  const userId = document.querySelector('input[name="userId"]');
  const userPw = document.querySelector('input[name="userPw"]');
  let text;
  let flag = false;
  // 사용자가 정보를 하나라도 입력하지 않을 경우 오류관련 모달을 출력한다.
  if(userName.value === "" || userId.value === "" || userPw.value === "") {
    text = "Please enter all the information."
    handleModal(text);
  } else if(userName.value !== "" && userId.value !== "" && userPw.value !== "") {
    // 사용자가 정보를 모두 입력했을 경우이다.
    $.post(
      "../assets/php/signUp.php",
      {
        "userId": userId.value,
        "userPw": userPw.value,
      },
      (data, status, xhr) => {
        // 이미 사용자의 정보가 있을 경우 오류 모달을 출력한다.
        if(data === "1") {
          text = "User information already exists. Please re-enter.";
          handleModal(text);
        } else {
          // 입력한 사용자의 정보가 존재하지 않을 경우 데이터를 추가하고 성공 모달을 출력하며 login.html 페이지로 이동한다.
          text = "You have successfully registered as a member."
          flag = true;
          handleModal(text, flag)
        }
      }
    )
  }
}

signUpBtn.addEventListener('click', handleSignUpBtn);
