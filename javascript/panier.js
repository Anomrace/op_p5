// on montre les données du panier avec un tableau 
const panierTable = document.querySelector('.panier')
let tableData = ''
tableData += '<tr><th>Nom</th><th>Couleur</th><th>Nombre de produit</th><th>Prix en euros</th><th></th></tr>'
if (JSON.parse(localStorage.getItem('items')) !== null){
    JSON.parse(localStorage.getItem('items')).map(data => {
    
        tableData += '<tr><th>' + data.name + '</th><th>' + data.color + '</th><th>' + data.no + '</th><th id="prix">' + data.price + '</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
    
})}
//effacer les produits dont on ne veut pas
function Delete(e) {
    let items = []
    JSON.parse(localStorage.getItem('items')).map(data => {
        if (data.name != e.parentElement.parentElement.children[0].textContent || data.color != e.parentElement.parentElement.children[1].textContent) {
            items.push(data)
        }

    })
    window.location.reload()
    localStorage.setItem('items', JSON.stringify(items))

}
panierTable.innerHTML = tableData

// on effectue la somme du prix et on affiche
const prix = document.querySelectorAll('th#prix')
let sommePrix = 0
for (let i = 0; i < prix.length; i++) {
    sommePrix += parseInt(prix[i].innerHTML)
}
let prixTotal = document.querySelector('.prixTotal')
prixTotal.innerHTML = sommePrix + '€'
// même chose que précédemment dans index et produit

const numberItems = document.querySelector('.nb')

let no = 0
if (JSON.parse(localStorage.getItem('items')) !== null) {
    JSON.parse(localStorage.getItem('items')).map(data => {
        no = no + data.no
        numberItems.innerHTML = no
    })
}


// on crée le tableau de produit dont on aura besoin et on y met les data id qui vont être renvoyé au serveur
let products = []
if (JSON.parse(localStorage.getItem('items')) !== null){
JSON.parse(localStorage.getItem('items')).map(data => {
    products.push(data.id)
})}

// on récupère les données du formulaire et les check 
const form = document.getElementById('contact')

function checkFirstName() {
    let letters = /^[A-Za-z-\s]+$/

    if (firstName.value.trim() === "") {
        let errorFirstName = document.getElementById('errorFirstName')
        errorFirstName.innerHTML = "le champs est requis"
        errorFirstName.style.color = 'red'

    } else if (letters.test(firstName.value) === false) {
        let errorFirstName = document.getElementById('errorFirstName')
        errorFirstName.innerHTML = "le champs est doit comporter des lettres des tirets uniquement"
        errorFirstName.style.color = 'red'

    } else {
        return true
    }

}

function checkLastName() {
    let letters = /^[A-Za-z-\s]+$/

    if (lastName.value.trim() === "") {
        let errorLastName = document.getElementById('errorLastName')
        errorLastName.innerHTML = "le champs est requis"
        errorLastName.style.color = 'red'

    } else if (letters.test(lastName.value) === false) {
        let errorLastName = document.getElementById('errorLastName')
        errorLastName.innerHTML = "le champs est doit comporter des lettres des tirets uniquement"
        errorLastName.style.color = 'red'

    } else {
        return true
    }

}

function checkAddress() {
    let letters = /^[0-9A-Za-z-\s]+$/

    if (address.value.trim() === "") {
        let errorAddress = document.getElementById('errorAddress')
        errorAddress.innerHTML = "le champs est requis"
        errorAddress.style.color = 'red'

    } else if (letters.test(address.value) === false) {
        let errorAddress = document.getElementById('errorAddress')
        errorAddress.innerHTML = "le champs est doit comporter des lettres des tirets uniquement"
        errorAddress.style.color = 'red'

    } else {
        return true
    }

}

function checkCity() {
    let letters = /^[A-Za-z-\s]+$/

    if (city.value.trim() === "") {
        let errorCity = document.getElementById('errorCity')
        errorCity.innerHTML = "le champs est requis"
        errorCity.style.color = 'red'

    } else if (letters.test(city.value) === false) {
        let errorCity = document.getElementById('errorCity')
        errorCity.innerHTML = "le champs est doit comporter des lettres des tirets uniquement"
        errorCity.style.color = 'red'

    } else {
        return true
    }

}

function checkEmail() {
    let mailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (email.value.trim() === "") {
        let errorEmail = document.getElementById('errorEmail')
        errorEmail.innerHTML = "le champs est requis"
        errorEmail.style.color = 'red'

    } else if (mailFormat.test(email.value) === false) {
        let errorEmail = document.getElementById('errorEmail')
        errorEmail.innerHTML = "Le champs doit comporter un email valide"
        errorEmail.style.color = 'red'

    } else {
        return true
    }
}



    form.addEventListener('submit', function (e) {

            e.preventDefault()
            let firstName = document.getElementById('firstName').value
            let lastName = document.getElementById('lastName').value
            let address = document.getElementById('address').value
            let city = document.getElementById('city').value
            let email = document.getElementById('email').value
    
    
            checkFirstName(firstName)
            checkLastName(lastName)
            checkAddress(address)
            checkCity(city)
            checkEmail(email)
    
            // on envoit les données avec une post request
            if(JSON.parse(localStorage.getItem('items')) !== null){
                fetch("http://localhost:3000/api/teddies/order", {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        contact: {
                            firstName: firstName,
                            lastName: lastName,
                            address: address,
                            city: city,
                            email: email,
                        },
                        products: products
                    })
                })
                .then(function (response) {
    
                    if (response.status != 201) {
                        window.alert('Veuillez vérifier les données que vous avez rentré')
                    } else {
                        return response.json()
    
                    }
                })
                .then(function (data) {
                    // quand la réponse est récupérée on supprime le panier et 
                    // on ouvre la page confirmation.html en transmettant les données pour un url search param
    
                    window.open(`confirmation.html?orderId=${data.orderId}&firstName=${firstName}&lastName=${lastName}&price=${sommePrix}`)
                    window.location.reload()
                    localStorage.clear()
                })
            }else{
                window.alert('Attention votre panier est vide!')
            }
            
    
        

    })

