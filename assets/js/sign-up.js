const loginBtn = document.querySelector('form button');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal button');

const handleLoginBtn = () => {
  const userName = document.querySelector('input[name="userName"]');
  const userId = document.querySelector('input[name="userId"]');
  const userPw = document.querySelector('input[name="userPw"]');
  if(userName.value === "" || userId.value === "" || userPw.value === "") {
    modal.style.display = "flex";
    modal.childNodes[1].innerText = "Please enter your Name, ID or password.";
    modalBtn.addEventListener('click', () => {
      modal.style.display = "none";
    });
  } else {
    location.href = "./login.html";
    modal.style.display = "none";
  }
}

loginBtn.addEventListener('click', handleLoginBtn);
