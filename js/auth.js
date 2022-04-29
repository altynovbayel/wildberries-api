const $userName = document.querySelector('.username')
const $pass = document.querySelector('.pass')
const $submit = document.querySelector('.submit')
const $form = document.querySelector('.form_body')

const BASE_URL = 'https://pbasics.pythonanywhere.com'
const authToken = localStorage.getItem('authToken')

window.addEventListener('load', () =>{
  if(authToken){
    open('./index.html', '_self')
  }
})

$form.addEventListener('submit', e => {
  e.preventDefault()

  fetch(`${BASE_URL}/auth/token/login`, {
    method: 'POST',
    body: JSON.stringify({
      password: $pass.value.trim(),
      username: $userName.value.trim(),
    }),
    headers: {
      'Content-type':'application/json'
    }
  })
  .then(res => {
    if(res.status < 400){
      return res
    }
  })
  .then(res => res.json())
  .then(r => {
    console.log(r);
    localStorage.setItem('authToken', r.auth_token)
    open('./index.html', '_self')
  })
})