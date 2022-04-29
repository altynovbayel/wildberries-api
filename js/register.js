const $userName = document.querySelector('.username')
const $email = document.querySelector('.email')
const $pass = document.querySelector('.pass')
const $submit = document.querySelector('.submit')
const $form = document.querySelector('.form_body')

const BASE_URL = 'https://pbasics.pythonanywhere.com'



$form.addEventListener('submit', e => {
  e.preventDefault()

  fetch(`${BASE_URL}/auth/users/`, {
    method: 'POST',
    body: JSON.stringify({
      username: $userName.value.trim(),
      password: $pass.value.trim(),
      email: $email.value.trim()
    }),
    headers:{
      'Content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(r => {
    console.log(r);
    window.open('./auth.html', '_self')
  })
})