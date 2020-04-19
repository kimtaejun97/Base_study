const user_form = document.querySelector('.user_form'),
  input = document.querySelector('.inputid');
const user = document.getElementById('user');
const resetbtn = document.getElementById('resetbtn');


function resetName() {
  localStorage.removeItem('username');
  input.style.display = 'block';
  resetbtn.style.display = 'none';
}
function saveUserName() {
  localStorage.setItem('username', input.value)
}
function user_handler(event) {
  saveUserName();
}

function User() {
  if (localStorage.getItem('username') === null) {
    resetbtn.style.display = 'none';
  }
  else {
    input.style.display = 'none';
    resetbtn.style.display = 'block';
    user.innerText = `${localStorage.getItem('username')}님 좋은하루 되세요.`;

  }
}

function init() {
  User();
  user_form.addEventListener('submit', user_handler);
  resetbtn.addEventListener('click', resetName)

}

init();
