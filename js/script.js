
const $row = document.querySelector('.row')
const $list = document.querySelector('.nav_list')
const $btnHeader = document.querySelector('.btn_header')
const $header = document.querySelector('.header')
const $closeHeader = document.querySelector('.btn_close')

const $createInputs = document.querySelector('.createInputs')
const $title = document.querySelector('.title')
const $desc = document.querySelector('.desc')
const $category = document.querySelector('.category')
const $imgUrl = document.querySelector('.imgUrl')
const $price = document.querySelector('.price')
const $createBtn = document.querySelector('.createBtn')

const logOut = () => {
  
  localStorage.clear()
  open('./auth.html', '_self')
}

const base = 'https://pbasics.pythonanywhere.com'
const userToken = localStorage.getItem('authToken')


window.addEventListener('load', () => {
  if(!userToken){
    open('./auth.html', '_self')
  }
  getCategory()
  getProducts()
})

function getCategory(){
  fetch(`${base}/category/`, {
    method:'GET',
    headers:{
      'Content-type': 'application/json',
    }
  })
  .then(res => res.json())
  .then(r => categoryTemplate(r))
}

// get category

function categoryTemplate(base){
  const category = base.map(({title,id}) => {
    return `
      <li class="category_item" onclick="routeCategory('${id}')">${title}</li>
    `
  }).join('')
  $list.innerHTML = category
  $list.insertAdjacentHTML('beforeend', `
    <button class="create" onclick="createInputs()">Create</button>
  `)
  $list.insertAdjacentHTML('beforeend', `
    <button class="logout" onclick="logOut()">Exit</button>
  `)
}

function routeCategory(id){
  console.log(id);
}

// get products

function getProducts(){
  fetch(`${base}/products`,{
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    }
  })
  .then(r => r.json())
  .then(res => {
    res.reverse()
    productTemplate(res)
  })
}

function productTemplate(base){
  console.log(base);
  const products = base.map(({ title, description, image, image_url, price, id}) => {
    return `
      <div class="card">   
        <div class="card_header">
          <h2>${title}</h2>
        </div>
        <div class="card_body">
          <img src="${image === null ? image_url : image}">
          <p>
            ${description}
          </p>
          <h3>$${price}</h3>
        </div>
        <div class="card_footer">
          <button class="del" onclick="deleteProducts('${id}')">
            Delete
          </button>
          <button class="edit" onclick="updateProduct('${id}')">
            Edit
          </button>
        </div>
      </div>
    `
  }).join('')

  $row.innerHTML = products
}

// delete products

function deleteProducts(id){
  fetch(`${base}/products/delete/${id}`, {
    method:'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Token ${userToken}`
    }
  })
  .then(getProducts)

}

// create products

function createInputs(){
  $createInputs.classList.toggle('active')
  $header.classList.remove('active')
}

function createProducts(){
  $createInputs.classList.remove('active')
  fetch(`${base}/products/create/ `, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Token ${userToken}`
    },
    body: JSON.stringify({
      title: $title.value,
      description: $desc.value,
      price: +$price.value,
      image_url: $imgUrl.value,
      category: +$category.value,
    })
  })
  .then(res => res.json())
  .then(getProducts)

}

$createBtn.addEventListener('click', e => {
  e.preventDefault()

  createProducts()
  
})

// update products


function updateProduct(id){
  console.log(id);
  fetch(`${base}/products/update/${id}`,{
    method:'PATCH',
    headers:{
      'Content-type': 'application/json',
      'Authorization': `Token ${userToken}`
    },
    body: JSON.stringify({
      title: prompt('new Title', 'defoult title'),
      description: prompt('desc', 'deafoult desc'),
      price: +prompt('price', 10),
      image_url: prompt('img url', 'https://manofmany.com/wp-content/uploads/2020/10/Crocs-x-Nike-Air-Force-1-4.jpg'),
      category: +prompt('category', 1),
    })
  })
  .then(res => res.json())
  .then(getProducts)
}

$btnHeader.addEventListener('click', e =>{
  e.preventDefault()
  $createInputs.classList.remove('active')
  $header.classList.add('active')
})

$closeHeader.addEventListener('click', e => {
  e.preventDefault()
  $header.classList.remove('active')
})