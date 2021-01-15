const params = new URLSearchParams(window.location.search)
let id = params.get('orderId')
let firstName = params.get('firstName')
let lastName = params.get('lastName')
let price = params.get('price')

let showId = document.getElementById('orderId')

showId.innerHTML = id

let showFirstName = document.getElementById('firstName')

showFirstName.innerHTML = firstName

let showLastName = document.getElementById('lastName')

showLastName.innerHTML = lastName

let showPrice = document.getElementById('price')

showPrice.innerHTML = price