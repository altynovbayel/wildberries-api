const $submit = document.querySelector('.submit')
const $form = document.querySelector('.form_body')
const $formInputs = document.querySelectorAll('.form_body input')

const BASE_URL = 'https://pbasics.pythonanywhere.com'

function isValidate(){
  $formInputs.forEach(item => {
    item.value.length === 0 
    ? item.classList.add('active')
    : item.classList.remove('active')
  })

  return [...$formInputs].every(item => item.value)
}

function inputValue() {
  return [...$formInputs].reduce((obj, item) => {
    return {
      ...obj,
      [item.name]:item.value.trim()
    }
  }, {})
}

$form.addEventListener('submit', e => {
  e.preventDefault()

  isValidate() &&
  fetch(`${BASE_URL}/auth/users/`, {
    method: 'POST',
    body: JSON.stringify(inputValue()),
    headers:{
      'Content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(r => {
    window.open('./auth.html', '_self')
  })
})